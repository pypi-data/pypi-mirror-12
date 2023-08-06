#mkdir myfact


The primary code will be in a file called fact.py
#vim myfact/fact.py

We also have a __init__.py file for the module.
#vim myfact/__init__.py
from fact import factorial


We also added a README.rst file. So, the directory structure looks like

$ ls
myfact  README.rst
$ ls myfact/
fact.py  __init__.py


Now we have to write a MANIFEST.in file which will be used to find out which all files will be part of the source tar ball of the project at the time of using sdist command.

#vim  MANIFEST.in
include *.py
include README.rst


$ pip install setuptools


#vim setup.py

find_packages is a special function which can find all modules under your source directory.


$ python setup.py sdist
One can see the tarball under dist directory.

$ ls dist/
factorial-0.1.tar.gz


now setup U package
$ python setup.py install
**********
import myfact
**********

去注册pypi账号
https://testpypi.python.org/pypi?%3Aaction=register_form
用户名qxj2016 密码https://pypi.python.org/id/

在用户家目录下创建.pypirc

#tips windows下创建的名字为.pypirc.
[distutils]
index-servers =
    pypi

[pypi]
repository: https://testpypi.python.org/pypi
username: qxj2016
password: https://pypi.python.org/id/


$ python setup.py register -r https://testpypi.python.org/pypi

$ python setup.py sdist upload -r https://testpypi.python.org/pypi


以后可以这么安装了
 $pip install -i https://testpypi.python.org/pypi <package name>





