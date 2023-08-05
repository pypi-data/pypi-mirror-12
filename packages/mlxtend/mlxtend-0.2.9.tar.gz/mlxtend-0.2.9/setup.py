from distutils.core import setup

setup(name='mlxtend',
      version='0.2.9',
      description='Machine Learning Library Extensions',
      author='Sebastian Raschka',
      author_email='se.raschka@gmail.com',
      url='https://github.com/rasbt/mlxtend',
      packages=['mlxtend',
                'mlxtend.feature_selection',
                'mlxtend.plotting',
                'mlxtend.classifier',
                'mlxtend.regression',
                'mlxtend.evaluate',
                'mlxtend.preprocessing',
                'mlxtend.math',
                'mlxtend.text',
                'mlxtend.file_io',
                'mlxtend.data',
                ],
      data_files = [('', ['LICENSE']),
                    ('', ['README.md']),
                   ],
      license='GPLv3',
      platforms='any',
      classifiers=[
          'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
          'Development Status :: 5 - Production/Stable',
          'Programming Language :: Python :: 3',
      ],
      long_description="""

A library of Python tools and extensions for data science.


Contact
=============

If you have any questions or comments about mlxtend, please feel free to contact me via
eMail: mail@sebastianraschka.com
or Twitter: https://twitter.com/rasbt

This project is hosted at https://github.com/rasbt/mlxtend

The documentation can be found at http://rasbt.github.io/mlxtend/

""",
    )
