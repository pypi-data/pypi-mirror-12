#!/usr/bin/env python

from setuptools import setup

setup(name='itcsmsgwclient',
      version='1.0.1',
      description='Python client module for the Intelecom Group AS SMS gateway',
      author='Intelecom Group AS',
      author_email='support.interactive@intele.com',
      url='https://github.com/Intelecom/smsgw-client-python',
      packages=['itcsmsgwclient'],
      license='MIT',
      install_requires=['jsonpickle', 'requests', 'requests-mock', 'six'],
      keywords='intelecom sms gateway',
      classifiers=[
    # How mature is this project? Common values are
    #   3 - Alpha
    #   4 - Beta
    #   5 - Production/Stable
    'Development Status :: 3 - Alpha',

    # Indicate who your project is intended for
    'Intended Audience :: Developers',
    'Topic :: Software Development :: Build Tools',

    # Pick your license as you wish (should match "license" above)
     'License :: OSI Approved :: MIT License',

    # Specify the Python versions you support here. In particular, ensure
    # that you indicate whether you support Python 2, Python 3 or both.
    'Programming Language :: Python :: 2',
    'Programming Language :: Python :: 2.6',
    'Programming Language :: Python :: 2.7',
    'Programming Language :: Python :: 3',
    'Programming Language :: Python :: 3.2',
    'Programming Language :: Python :: 3.3',
    'Programming Language :: Python :: 3.4',
]
     )