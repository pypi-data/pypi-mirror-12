#!/usr/bin/env python
# -*- coding: utf-8 -*-


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


with open('README.rst') as readme_file:
    readme = readme_file.read()

with open('HISTORY.rst') as history_file:
    history = history_file.read().replace('.. :changelog:', '')

requirements = [
    'requests',
    'schematics',
]

test_requirements = [
    'unittest2',
]

setup(
    name='parcelbright',
    version='0.3.3',
    description="ParcelBright API wrapper",
    long_description=readme + '\n\n' + history,
    author="Marek Wywiał",
    author_email='onjinx@gmail.com',
    url='https://github.com/onjin/parcelbright-python',
    packages=[
        'parcelbright',
    ],
    package_dir={'parcelbright':
                 'parcelbright'},
    include_package_data=True,
    install_requires=requirements,
    license="BSD",
    zip_safe=False,
    keywords='parcelbright',
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
    ],
    test_suite='tests',
    tests_require=test_requirements
)
