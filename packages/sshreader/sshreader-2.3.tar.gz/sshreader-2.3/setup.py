#!/usr/bin/env python2
# coding=utf-8
"""Setup file for sshreader module"""

from setuptools import setup

setup(name='sshreader',
      version='2.3',
      description='Multi-threading/processing wrapper for Paramiko',
      author='Jesse Almanrode',
      author_email='jesse@almanrode.com',
      url='https://bitbucket.org/isaiah1112/sshreader',
      packages=['sshreader'],
      include_package_data=True,
      license='GNU Lesser General Public License v3 or later (LGPLv3+)',
      install_requires=['paramiko>=1.15',
                        ],
      platforms=['Linux', 'Mac OS X'],
      classifiers=[
          'Programming Language :: Python',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: GNU Lesser General Public License v3 or later (LGPLv3+)',
          'Development Status :: 5 - Production/Stable',
          'Programming Language :: Python',
          'Programming Language :: Python :: 2',
          'Programming Language :: Python :: 2.7',
          'Topic :: Software Development :: Libraries',
          'Topic :: Software Development :: Libraries :: Python Modules',
          ],
      )
