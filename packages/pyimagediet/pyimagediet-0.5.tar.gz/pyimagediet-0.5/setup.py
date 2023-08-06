from setuptools import setup, find_packages
from setuptools.command.test import test as TestCommand
import sys

class Tox(TestCommand):
    user_options = [('tox-args=', 'a', "Arguments to pass to tox")]
    def initialize_options(self):
        TestCommand.initialize_options(self)
        self.tox_args = None
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True
    def run_tests(self):
        #import here, cause outside the eggs aren't loaded
        import tox
        import shlex
        args = self.tox_args
        if args:
            args = shlex.split(self.tox_args)
        errno = tox.cmdline(args=args)
        sys.exit(errno)


long_description = '''\
pyimagediet is a Python wrapper around image optimisations tools used to
reduce images size without loss of visual quality. It provides a uniform
interface to tools, easy configuration and integration.

It works on images in JPEG, GIF and PNG formats and will leave others
unchanged.'''

setup(
    author="Marko Samastur",
    author_email="markos@gaivo.net",
    name='pyimagediet',
    version='0.5',
    description='Python wrapper around image optimisations tools',
    long_description=long_description,
    url='https://github.com/samastur/pyimagediet/',
    platforms=['OS Independent'],
    license='MIT License',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Multimedia :: Graphics',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Utilities',
    ],
    install_requires=[
        'PyYAML>=3.11',
        'python-magic>=0.4.10',
    ],
    include_package_data=True,
    packages=['pyimagediet'],
    tests_require=['tox'],
    cmdclass = {'test': Tox},
    zip_safe=False
)
