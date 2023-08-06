
def main():

    from glob import glob
    from setuptools import setup

    exec(open('qap/version.py').read())
    setup(name='qap',
          version=__version__,
          description='A collection of three quality assessment pipelines ' \
                      'for anatomical MRI and functional MRI scans.',
          author='Cameron Craddock, Zarrar Shehzad, Steven Giavasis,' \
                 'Daniel Clark',
          author_email='cameron.craddock@childmind.org',
          url='https://github.com/preprocessed-connectomes-project/' \
              'quality-assessment-protocol',
          download_url='https://github.com/preprocessed-connectomes-project/'\
                       'quality-assessment-protocol/tarball/1.0.2',
          license='',
          packages=['qap', 'qap.viz'],
          package_data={'qap': ['inpoint*.txt',
                                'test_data/*.nii.gz',
                                'test_data/workflow_reference/*/*',
                                'test_data/*/*/*/*/*']},
          scripts=glob("scripts/*"),
          install_requires=["scipy", "nipype", "nibabel", "nitime", "pyyaml",
                            "pandas", "seaborn", "pyPdf2", "xhtml2pdf"],
          zip_safe=False)

if __name__ == "__main__":

    import os
    import sys

    local_path = os.path.dirname(os.path.abspath(sys.argv[0]))
    os.chdir(local_path)
    sys.path.insert(0, local_path)

    main()
