#!/usr/bin/env python
try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

requirements = [
]

test_requirements = [
]

setup(
    name='adb_android',
    version='0.5.0',
    description="Enables android adb in your python script",
    long_description='This python package is a wrapper for standard android adb\
    implementation. It allows you to execute android adb commands in your \
    python script.',
    author='Viktor Malyi',
    author_email='v.stratus@gmail.com',
    url='https://github.com/vmalyi/adb_android',
    packages=[
        'adb_android',
    ],
    package_dir={'adb_android':'adb_android'},
    include_package_data=True,
    install_requires=requirements,
    license="GNU",
    keywords='adb, android',
    classifiers=[
    'Development Status :: 4 - Beta',
    'Programming Language :: Python :: 2.7',
    'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
    'Topic :: Software Development :: Testing',
    'Intended Audience :: Developers'
    ],
    test_suite='tests',
)
