version = '1.5.1'

from setuptools import setup, find_packages


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()

long_description = (
    open('README.rst').read() + '\n' +
    open('CHANGES.rst').read()
)

setup(
    name='collective.transmogrifier',
    version=version,
    description='A configurable pipeline, aimed at transforming content for '
                'import and export',
    long_description=long_description,
    # Get more strings from http://www.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
    ],
    keywords='content import filtering',
    author='Jarn',
    author_email='info@jarn.com',
    url='http://pypi.python.org/pypi/collective.transmogrifier',
    license='GPL',
    packages=find_packages('src', exclude=['ez_setup']),
    package_dir={'': 'src'},
    namespace_packages=['collective'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        'Products.CMFCore',
    ],
)
