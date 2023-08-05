# -*- coding: utf-8 -*-

from setuptools import setup


VERSION = '0.2.2'
DESCRIPTION = 'Browse and listen Youtube video soundtrack from your terminal'
LONG_DESCRIPTION = """\
Please visit the `GitHub page<https://github.com/NiZiL/clitube>`_!
"""

setup(
    name='clitube',
    version=VERSION,
    author='NiZiL',
    author_email='biasutto.t@gmail.com',

    url='https://github.com/NiZiL/clitube',
    download_url='https://github.com/NiZiL/clitube/tarball/'+VERSION,

    description=DESCRIPTION,
    long_description=LONG_DESCRIPTION,
    keywords=['YouTube', 'CLI'],
    classifiers=['Development Status :: 3 - Alpha',
                 'Environment :: Console :: Curses',
                 'Intended Audience :: End Users/Desktop',
                 'License :: OSI Approved :: MIT License',
                 'Operating System :: POSIX :: Linux',
                 'Programming Language :: Python :: 3 :: Only',
                 'Topic :: Multimedia :: Sound/Audio'],

    packages=['clitube'],
    scripts=['scripts/clitube'],

    test_suite='tests',

    install_requires=['requests', 'youtube-dl']
)
