#!/usr/bin/env python
import os.path
from distutils.core import setup
import bna


README = open(os.path.join(os.path.dirname(__file__), "README.rst")).read()

CLASSIFIERS = [
	"Development Status :: 5 - Production/Stable",
	"Intended Audience :: Developers",
	"License :: OSI Approved :: MIT License",
	"Programming Language :: Python",
	"Programming Language :: Python :: 3",
	"Programming Language :: Python :: 3.3",
	"Programming Language :: Python :: 3.4",
	"Programming Language :: Python :: 3.5",
	"Topic :: Security",
	"Topic :: Security :: Cryptography",
]

setup(
	name="bna",
	py_modules=["bna"],
	scripts=["bin/bna"],
	author=bna.__author__,
	author_email=bna.__email__,
	classifiers=CLASSIFIERS,
	description="Battle.net Authenticator routines in Python.",
	download_url="https://github.com/jleclanche/python-bna/tarball/master",
	long_description=README,
	url="https://github.com/jleclanche/python-bna",
	version=bna.__version__,
)
