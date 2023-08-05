#! python3

"""A setuptools based setup module.

See:
https://packaging.python.org/en/latest/distributing.html
https://github.com/pypa/sampleproject
"""

# Always prefer setuptools over distutils
from setuptools import setup, find_packages
from build import find_version, read

import pypandoc

settings = {
	"name": "comiccrawler",
	"version": find_version("comiccrawler/__init__.py"),
	"description": 'An image crawler with extendible modules and gui',
	# Get the long description from the relevant file
	"long_description": pypandoc.convert("README.md", "rst").replace("\r", ""),
	"url": 'https://github.com/eight04/ComicCrawler',
	"author": 'eight',
	"author_email": 'eight04@gmail.com',
	"license": 'MIT',
	# See https://pypi.python.org/pypi?%3Aaction=list_classifiers
	"classifiers": [
		'Development Status :: 5 - Production/Stable',
		"Environment :: Console",
		"Environment :: Win32 (MS Windows)",
		"Intended Audience :: End Users/Desktop",
		"License :: OSI Approved :: MIT License",
		"Natural Language :: Chinese (Traditional)",
		"Operating System :: Microsoft :: Windows :: Windows 7",
		"Programming Language :: Python :: 3.4",
		"Topic :: Internet"
	],
	"keywords": 'crawler',
	"packages": find_packages(),
	"install_requires": ["docopt", "pyexecjs", "pythreadworker"],
	"entry_points": {
		"console_scripts": [
			"comiccrawler = comiccrawler:console_init"
		]
	}
}

if __name__ == "__main__":	
	setup(**settings)
