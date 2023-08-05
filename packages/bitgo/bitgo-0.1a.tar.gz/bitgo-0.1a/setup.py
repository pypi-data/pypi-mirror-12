from setuptools import setup

setup(
    name='bitgo',
    packages=['bitgo'],
    version='0.1a',
    description='alpha version of a bitgo python library',
    author='Sebastian Serrano',
    author_email='sebastian@bitpagos.com',
    entry_points={
        'console_scripts':
            [
                'bitgo = bitgo.cmd:main',
            ]
    },
    url='https://github.com/sserrano44/pybitgo',
    download_url='https://github.com/sserrano44/pybitgo/tarball/0.1a',
    keywords=['bitcoin', 'bitgo'],
    classifiers=[
        'Programming Language :: Python :: 2.7',
        'Topic :: Internet',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    install_requires=["pycryptodome", "requests", "pycoin"]
)
