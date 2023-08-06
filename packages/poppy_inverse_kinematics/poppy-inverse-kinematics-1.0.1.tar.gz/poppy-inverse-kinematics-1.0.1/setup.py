#!/usr/bin/env python
from setuptools import setup

setup(name='poppy-inverse-kinematics',
      version='1.0.1',
      author="Pierre Manceron",
      description="An inverse kinematics library aiming performance and modularity",
      url="https://github.com/Phylliade/poppy-inverse-kinematics",
      license="GNU GENERAL PUBLIC LICENSE Version 3",
      packages=['poppy_inverse_kinematics', 'poppy_inverse_kinematics.tools'],
      package_dir={'': 'src'},
      install_requires=['numpy', 'scipy', 'sympy'],
      classifiers=["Programming Language :: Python :: 2", "Programming Language :: Python :: 3", "Topic :: Scientific/Engineering"],
      keywords='robotics inverse-kinematics'
      )
