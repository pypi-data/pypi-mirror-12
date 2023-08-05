#!/usr/bin/env python

from setuptools import setup, find_packages

setup(name='dronekit_sitl',
      version='2.4.2',
      description='DroneKit library to run SITL (simulation environment)',
      author='Tim Ryan',
      author_email='tim@3drobotics.com',
      url='https://github.com/dronekit/dronekit-sitl/',
      install_requires = [
        'psutil>=3.0',
        'dronekit>=2.0.0b5',
      ],
      package_data={
        'dronekit_sitl': ['*.parm'],
      },
      entry_points={
          'console_scripts': [
              'dronekit-sitl = dronekit_sitl.__init__:main'
          ]
      },
      packages = ['dronekit_sitl', 'dronekit_sitl.pysim'],
      )
