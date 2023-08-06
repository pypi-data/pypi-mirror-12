#!/usr/bin/env python
__author__ = 'vikesh'

from setuptools import setup, find_packages


version = '0.0.6'


setup(
    name='gitignore',
    version=version,
    description='gitignore command generates .gitingore files from the command line.',
    long_description=open('README.rst').read(),
    author='Vikesh Tiwari',
    author_email='tvicky002@gmail.com',
    license='MIT',
    keywords=['gitignore','git','github','command line','cli'],
    url='http://github.com/vicky002/L-Commands',
    packages = find_packages(),
    package_data={
        'gitignore': ['data/*.gitignore', 'data/Global/*.gitignore']
    },
    install_requires=[
        'docopt>=0.6.2',
    ],
    entry_points={
        'console_scripts': [
            'gitignore=gitignore.gitignore:main',
        ],
    }

)

