#!/usr/bin/env python
import setuptools


setuptools.setup(
    name='pandemic',
    packages=setuptools.find_packages(),
    include_package_data=True,
    install_requires=[
        'flask',
        'flask_socketio',
        'eventlet'
    ],
    classifiers=["Programming Language :: Python :: 2.7"]
)


# cmd > python setup.py install
# to include more files which aren't python packages, add them to the MANIFEST.in file.
