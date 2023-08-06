from distutils.core import setup
from distutils.command.install_data import install_data

import sys

if sys.version_info[0] < 3:
    install_requires = ["enum34", "trollius", "futures"]
else:
    install_requires = []

setup(name="freeopcua", 
      version="0.9.13pre2",
      description="Pure Python OPC-UA client and server library",
      author="Olivier Roulet-Dubonnet",
      author_email="olivier.roulet@gmail.com",
      url='http://freeopcua.github.io/',
      packages=["opcua"],
      provides=["opcua"],
      license="GNU Lesser General Public License",
      install_requires=install_requires,
      classifiers=["Programming Language :: Python",
                   "Programming Language :: Python :: 3",
                   "Programming Language :: Python :: 2",
                   "Development Status :: 4 - Beta",
                   "Intended Audience :: Developers",
                   "Operating System :: OS Independent",
                   "Topic :: Software Development :: Libraries :: Python Modules",
                   ],
      entry_points={'console_scripts': 
                    [
                        'uaread = opcua.tools.uaread',
                        'uals = opcua.tools.uals'
                    ]
                    }
      )

