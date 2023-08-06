import os
from setuptools import setup
from pyspeedtest import __version__

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='pyspeedtest',
    version=__version__,
    py_modules=['pyspeedtest'],
    scripts=['bin/pyspeedtest'],
    license='MIT License',
    description='Speedtest.net python script',
    url='https://github.com/fopina/pyspeedtest',
    download_url='https://github.com/fopina/pyspeedtest/tarball/v' + __version__,
    author='Filipe Pina',
    author_email='fopina@skmobi.com',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
    ],
    keywords=['speed', 'test', 'bandwidth']
)
