#!/usr/bin/env python
from __future__ import with_statement
import os
from setuptools import setup, find_packages

readme = 'README.md'
if os.path.exists('README.rst'):
    readme = 'README.rst'
with open(readme, 'rb') as f:
    long_description = f.read().decode('utf-8')

with open('requirements.txt') as f:
    requirements = [l for l in f.read().splitlines() if l]

setup(
    name='wechatpy',
    version='1.2.0',
    author='messense',
    author_email='messense@icloud.com',
    url='https://github.com/messense/wechatpy',
    packages=find_packages(),
    keywords='WeChat, wexin, SDK',
    description='wechatpy: WeChat SDK for Python',
    long_description=long_description,
    install_requires=requirements,
    include_package_data=True,
    tests_require=['nose', 'httmock', 'redis', 'pymemcache', 'shove'],
    test_suite='nose.collector',
    classifiers=[
        'Development Status :: 4 - Beta',
        'License :: OSI Approved :: MIT License',
        'Operating System :: MacOS',
        'Operating System :: POSIX',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Libraries',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Utilities',
    ],
    extras_require={
        'cryptography': ['cryptography'],
        'pycrypto': ['pycrypto'],
    }
)
