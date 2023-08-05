__author__ = 'Russell Harkanson'

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

VERSION = '1.0.5'

setup(name='pyriscope',
      version=VERSION,
      author=__author__,
      author_email='rharkanson@gmail.com',
      url='https://github.com/rharkanson/pyriscope',
      description='A simple Periscope video downloader for Python.',
      license='MIT',
      packages=['pyriscope'],
      package_data={'pyriscope': ['*.txt']},
      download_url='https://github.com/rharkanson/pyriscope/tarball/{}'.format(VERSION),
      keywords = ['video', 'downloader', 'Periscope'],
      classifiers=[],
      long_description="""
Easily download any available Periscope stream by simply giving pyriscope the URL.

Pyriscope automatically downloads and stitches together Periscope chunks.

Optionally, pyriscope converts the downloaded .ts file to a .mp4 file with optional rotation. (Requires ffmpeg)

Usage:
    pyriscope <url> [options]

See 'pyriscope --help' for further details.
        """)
