from setuptools import setup

setup(
    name='pyticketswitch',
    version='1.8.0',
    author='Ingresso',
    author_email='systems@ingresso.co.uk',
    url='https://github.com/ingresso-group/pyticketswitch/',
    packages=[
        'pyticketswitch',
        'pyticketswitch.interface_objects'
    ],
    license='MIT',
    description='A Python interface for the Ingresso XML Core API',
    long_description=open('README.rst').read(),
    install_requires=[
        'requests>=2.0.0',
    ],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Programming Language :: Python :: 2.7',
        'Intended Audience :: Developers',
        'Natural Language :: English',
    ],
)
