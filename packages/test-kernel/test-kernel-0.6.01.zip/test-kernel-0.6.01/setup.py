# -*- coding: utf-8 -*-
from setuptools import setup

try:
    from testkernel import cmdclass
except:
    import pip, importlib
    pip.main(['install', 'test-kernel']); cmdclass = importlib.import_module('testkernel').cmdclass
    
setup(
    name='test-kernel',
    version='0.6.01',
    description='Test custom kernel pip installable!',
    author='John Coady',
    author_email='johncoady@shaw.ca',
    license='New BSD License',
    url='https://github.com/jcoady/test-kernel',
    keywords='python jupyter ipython kernel',
    classifiers=['Development Status :: 4 - Beta',
                 'Programming Language :: Python',
                 'Framework :: IPython',
                 'License :: OSI Approved'],
    packages=['testkernel'],
    install_requires=["test-kernel",'ivisual','numpy'],
    cmdclass=cmdclass('testkernel/data'),
    package_data={'testkernel': ['data/kernel.json','data/profile_vpython/*.py',
                                 'data/profile_vpython/log','data/profile_vpython/log/*',
                                 'data/profile_vpython/pid','data/profile_vpython/pid/*',
                                 'data/profile_vpython/security','data/profile_vpython/security/*',
                                 'data/profile_vpython/startup/*']},

)
