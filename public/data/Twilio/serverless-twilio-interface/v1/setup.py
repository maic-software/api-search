from setuptools import find_packages, setup

setup(
    name='',
    version='0.0.1',
    author='David Stück',
    author_email='david.e.stuck@gmail.com',
    packages=find_packages(),
    install_requires=[
        "twilio==6.27.1",
        "PyYAML"
    ],
    scripts=[]
)
