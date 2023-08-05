from setuptools import setup, find_packages
import sys

with open("network_tester/version.py", "r") as f:
    exec(f.read())

requirements = ["rig", "numpy>1.6", "six"]
if sys.version_info < (3, 4, 0):
    # Python versions < 3.4 require "enum34" to be installed
    requirements.append("enum34")

setup(
    name="network_tester",
    version=__version__,
    packages=find_packages(),
    package_data={'network_tester': ['binaries/*.aplx']},

    # Metadata for PyPi
    url="https://github.com/project-rig/network_tester",
    author="Jonathan Heathcote",
    description="SpiNNaker network experiment library.",
    license="GPLv2",

    # Requirements
    install_requires=requirements,
)
