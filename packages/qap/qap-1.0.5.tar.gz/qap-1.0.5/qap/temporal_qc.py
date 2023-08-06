
import os
import sys
import numpy as np
import nibabel as nb
import pandas as pd
import scipy.ndimage as nd
import scipy.stats as stats
from tempfile import mkdtemp
import shutil

# DVARS
from dvars import mean_dvars_wrapper


def fd_jenkinson(in_file, rmax=80., out_file=None):
    '''
    @ Krsna
    May 2013
    compute
    1) Jenkinson FD from 3dvolreg's *.affmat12.1D file from -1Dmatrix_save
    option input: subject ID, rest_number, name of 6 parameter motion
    correction file (an output of 3dvolreg) output: FD_J.1D file
    Assumptions: 1) subject is available in BASE_DIR
    2) 3dvolreg is already performed and the 1D motion parameter and 1D_matrix
    file file is present in sub?/rest_? called as --->'lfo_mc_affmat.1D'

    Method to calculate Framewise Displacement (FD) calculations
    (Jenkinson et al., 2002)
    Parameters; in_file : string
                rmax : float
                The default radius (as in FSL) of a sphere represents the brain
    Returns; out_file : string
    NOTE: infile should have one 3dvolreg affine matrix in one row -
    NOT the motion parameters
    '''

    import numpy as np
    import os
    import os.path as op
    from shutil import copyfile
    import sys
    import math

    if out_file is None:
        fname, ext = op.splitext(op.basename(in_file))
        out_file = op.abspath('%s_fdfile%s' % (fname, ext))

    # if in_file (coordinate_transformation) is actually the rel_mean output
    # of the MCFLIRT command, forward that file
    if 'rel.rms' in in_file:
        copyfile(in_file, out_file)
        return out_file

    pm_ = np.genfromtxt(in_file)
    original_shape = pm_.shape
    pm = np.zeros((pm_.shape[0], pm_.shape[1] + 4))
    pm[:, :original_shape[1]] = pm_
    pm[:, original_shape[1]:] = [0.0, 0.0, 0.0, 1.0]

    # rigid body transformation matrix
    T_rb_prev = np.matrix(np.eye(4))

    flag = 0
    X = [0]  # First timepoint
    for i in range(0, pm.shape[0]):
        # making use of the fact that the order of aff12 matrix is "row-by-row"
        T_rb = np.matrix(pm[i].reshape(4, 4))

        if flag == 0:
            flag = 1
        else:
            M = np.dot(T_rb, T_rb_prev.I) - np.eye(4)
            A = M[0:3, 0:3]
            b = M[0:3, 3]

            FD_J = math.sqrt(
                (rmax * rmax / 5) * np.trace(np.dot(A.T, A)) + np.dot(b.T, b))
            X.append(FD_J)

        T_rb_prev = T_rb

    np.savetxt(out_file, np.array(X))
    return out_file


# 3dTout
def outlier_timepoints(func_file, mask_file, out_fraction=True):
    """
    Calculates the number of 'outliers' in a 4D functional dataset,
    at each time-point.

    Will call on AFNI's 3dToutcount.

    Parameters
    ----------
    func_file: str
        Path to 4D functional file (could be motion corrected or not??)
    mask_file: str
        Path to functional brain mask
    out_fraction: bool (default: True)
        Whether the output should be a count (False) or fraction (True)
        of the number of masked voxels which are outliers at each time point.

    Returns
    -------
    outliers: list
    """

    import commands
    import re

    opts = []
    if out_fraction:
        opts.append("-fraction")
    opts.append("-mask %s" % mask_file)
    opts.append(func_file)
    str_opts = " ".join(opts)

    # TODO:
    # check if should use -polort 2 (http://www.na-mic.org/Wiki/images/8/86/FBIRNSupplementalMaterial082005.pdf)
    # or -legendre to remove any trend
    cmd = "3dToutcount %s" % str_opts
    out = commands.getoutput(cmd)

    # Extract time-series in output
    lines = out.splitlines()

    # remove general information and warnings
    outliers = [float(l) for l in lines if re.match("[0-9]+$", l.strip())]

    return outliers


def mean_outlier_timepoints(*args, **kwrds):
    outliers = outlier_timepoints(*args, **kwrds)
    mean_outliers = np.mean(outliers)
    return mean_outliers


# 3dTqual
def quality_timepoints(func_file, automask=True):
    """
    Calculates a 'quality index' for each timepoint in the 4D functional
    dataset. Low values are good and indicate that the timepoint is not very
    different from the norm.
    """

    import subprocess

    opts = []
    if automask:
        opts.append("-automask")
    opts.append(func_file)
    str_opts = " ".join(opts)

    cmd = "3dTqual %s" % str_opts
    p = subprocess.Popen(cmd.split(" "),
                         stdout=subprocess.PIPE,
                         stderr=subprocess.PIPE)
    out, err = p.communicate()

    #import code
    # code.interact(local=locals())

    # Extract time-series in output
    lines = out.splitlines()
    # remove general information
    lines = [l for l in lines if l[:2] != "++"]
    # string => floats
    outliers = [float(l.strip())
                for l in lines]  # note: don't really need strip

    return outliers


def mean_quality_timepoints(*args, **kwrds):
    qualities = quality_timepoints(*args, **kwrds)
    mean_qualities = np.mean(qualities)
    return mean_qualities


def global_correlation(func_motion, func_mask):

    import scipy
    import numpy as np
    from dvars import load

    zero_variance_func = load(func_motion, func_mask)

    list_of_ts = zero_variance_func.transpose()

    # get array of z-scored values of each voxel in each volume of the
    # timeseries
    demeaned_normed = []

    for ts in list_of_ts:

        demeaned_normed.append(scipy.stats.mstats.zscore(ts))

    demeaned_normed = np.asarray(demeaned_normed)

    # make an average of the normalized timeseries, into one averaged
    # timeseries, a vector of N volumes
    volume_list = demeaned_normed.transpose()

    avg_ts = []

    for voxel in volume_list:

        avg_ts.append(voxel.mean())

    avg_ts = np.asarray(avg_ts)

    # calculate the global correlation
    gcor = (avg_ts.transpose().dot(avg_ts)) / len(avg_ts)

    return gcor
