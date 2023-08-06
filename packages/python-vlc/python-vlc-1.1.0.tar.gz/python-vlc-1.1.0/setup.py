from distribute_setup import use_setuptools
use_setuptools()

import logging
import os
import shutil
from distutils.core import setup

import generate


vlc_include_path = os.path.join("..", "..", "include", "vlc")
if os.path.exists(vlc_include_path):
    files = [ os.path.join(vlc_include_path, filename)
              for filename in os.listdir(vlc_include_path) ]
    generate.process('vlc.py', files)
else:
    logging.warning("This script should be run from a VLC tree. "
                    "Falling back to pre-generated file.")
    shutil.copy(os.path.join('generated', 'vlc.py'), 'vlc.py')

setup(name='python-vlc',
      version = '1.1.0',
      author='Olivier Aubert',
      author_email='contact@olivieraubert.net',
      url='http://wiki.videolan.org/PythonBinding',
      py_modules=['vlc'],
      keywords = [ 'vlc', 'video' ],
      license = "GPL",
      description = "VLC bindings for python.",
      long_description = """VLC bindings for python.

This module provides ctypes-based bindings for the native libvlc API
(see http://wiki.videolan.org/LibVLC) of the VLC video player.

It is automatically generated from the include files if they are available.
"""
      )
