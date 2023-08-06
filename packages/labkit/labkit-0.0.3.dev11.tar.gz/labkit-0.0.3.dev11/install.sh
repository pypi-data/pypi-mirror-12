#!/usr/bin/env bash

# 设置环境变量

echo "export PYTHONPATH=$(pwd):\$PYTHONPATH" >>~/.bashrc
echo "export PYTHONPATH=$(pwd)/../general:\$PYTHONPATH" >>~/.bashrc
echo "export PATH=$(pwd)/bin:\$PATH" >>~/.bashrc
# python setup.py install
#pip install -r requirements.txt
#pip install labkit


# 设置virtualenv
