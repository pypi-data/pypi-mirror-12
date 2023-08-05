import os
from setuptools import setup
import pykkelabels


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "Pykkelabels",
    version = pykkelabels.__version__,
    author = pykkelabels.__maintainer__,
    author_email = pykkelabels.__email__,
    description = ("Provides access to the pakkelabels.dk web service."),
    license = pykkelabels.__license__,
    keywords = "pakke labels pakkelabels pakkelabels.dk",
    url = "https://github.com/anderswb/PykkeLabels",
    packages=['pykkelabels', 'test'],
    long_description=read('README.md'),
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Topic :: Utilities",
        "License :: OSI Approved :: MIT License",
    ],
)