from distutils.core import setup

setup(
    name='claripy',
    version='4.5.10.14',
    packages=['claripy', 'claripy.backends', 'claripy.frontends', 'claripy.vsa', 'claripy.ast'],
    install_requires=[
        'ana',
        'angr-z3',
    ],
)
