from setuptools import setup
from biomartian.config.version import __version__

setup(
    name = "biomartian",
    packages = ["biomartian", "biomartian/args", "biomartian/bm_queries", "biomartian/config"],
    scripts = ["bin/biomartian"],
    version = __version__,
    description = "Access BioMart from the command line.",
    author = "Endre Bakken Stovner",
    author_email = "endrebak@stud.ntnu.no",
    url = "http://github.com/endrebak/biomartian",
    keywords = ["BioMart"],
    license = ["GPL-3.0"],
    install_requires = ["pandas>=0.16", "ebs", "docopt", "joblib", "bioservices"],
    classifiers = [
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Development Status :: 2 - Pre-Alpha",
        "Environment :: Other Environment",
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: POSIX :: Linux",
        "Operating System :: MacOS :: MacOS X",
        "Topic :: Scientific/Engineering"],
    long_description = ("Access BioMart from the command line. See webpage for more info."))
