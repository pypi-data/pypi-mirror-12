from distutils.core import setup

setup(
    name='claripy',
    version='4.5.11.23',
    packages=['claripy', 'claripy.backends', 'claripy.frontends', 'claripy.vsa', 'claripy.ast'],
    install_requires=[
        'ana',
        'angr-z3',
    ],
)
