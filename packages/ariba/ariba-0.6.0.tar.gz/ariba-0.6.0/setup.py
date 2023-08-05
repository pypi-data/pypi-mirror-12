import os
import shutil
import sys
import glob
from setuptools import setup, find_packages


setup(
    name='ariba',
    version='0.6.0',
    description='ARIBA: Antibiotic Resistance Identification By Assembly',
    packages = find_packages(),
    author='Martin Hunt',
    author_email='path-help@sanger.ac.uk',
    url='https://github.com/sanger-pathogens/ariba',
    scripts=glob.glob('scripts/*'),
    test_suite='nose.collector',
    tests_require=['nose >= 1.3'],
    install_requires=[
        'openpyxl',
        'pyfastaq >= 3.10.0',
        'pysam >= 0.8.1',
        'pymummer>=0.6.1'
    ],
    license='GPLv3',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Topic :: Scientific/Engineering :: Bio-Informatics',
        'Programming Language :: Python :: 3 :: Only',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
    ],
)
