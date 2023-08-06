import os
import glob
import shutil
import os.path

try:
    from setuptools import setup, Extension, Command, find_packages
except ImportError:
    from distutils.core import setup, Extension, Command, find_packages


dirname = os.path.dirname(os.path.abspath(__file__))


class BaseCommand(Command):
    user_options = []

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass


class CleanCommand(BaseCommand):
    description = 'cleanup directories created by packaging and build processes'  # noqa

    def run(self):
        for path in ['build', 'dist', 'misaka.egg-info', 'docs/_build']:
            if os.path.exists(path):
                path = os.path.join(dirname, path)
                print('removing %s' % path)
                shutil.rmtree(path)


class CythonCommand(BaseCommand):
    description = 'compile Cython files(s) into C file(s)'

    def run(self):
        try:
            from Cython.Compiler.Main import compile
            path = os.path.join(dirname, 'src', 'misaka.pyx')
            print('compiling %s' % path)
            compile(path)
        except ImportError:
            print('Cython is not installed. Please install Cython first.')


class VendorCommand(BaseCommand):
    description = 'update Sundown files. Use `git submodule init`, '\
        '`git submodule update` and `git submodule foreach git pull origin master`'\
        ' to the most recent files'

    def run(self):
        files = []
        dest = os.path.join(dirname, 'src/sundown')

        for path in ['vendor/sundown/src/*', 'vendor/sundown/html/*']:
            files += glob.glob(os.path.join(dirname, path))

        for path in files:
            if os.path.exists(path):
                print('copy %s -> %s' % (path, dest))
                shutil.copy(path, dest)


class TestCommand(BaseCommand):
    description = 'run unit tests'

    def run(self):
        os.system('python tests/misaka_test.py')


setup(
    name='douban.misaka',
    version='1.0.1',
    description='The Python binding for Sundown, a markdown parsing library.',
    author='Frank Smit',
    author_email='frank@61924.nl',
    url='http://misaka.61924.nl/',
    license='MIT',
    long_description=open(os.path.join(dirname, 'README.rst')).read(),
    scripts=['scripts/misaka'],
    namespace_packages=['douban'],
    packages=find_packages(include=['douban']),
    cmdclass={
        'clean': CleanCommand,
        'compile_cython': CythonCommand,
        'update_vendor': VendorCommand,
        'test': TestCommand
    },
    ext_modules=[Extension('douban.misaka', [
        'src/misaka.c',
        'src/wrapper.c',
        'src/sundown/stack.c',
        'src/sundown/buffer.c',
        'src/sundown/markdown.c',
        'src/sundown/html.c',
        'src/sundown/html_smartypants.c',
        'src/sundown/houdini_href_e.c',
        'src/sundown/houdini_html_e.c',
        'src/sundown/autolink.c'
    ])],
    py_modules=['douban.misaka'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: C',
        'Programming Language :: Cython',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.2',
        'Topic :: Text Processing :: Markup',
        'Topic :: Text Processing :: Markup :: HTML',
        'Topic :: Utilities'
    ]
)
