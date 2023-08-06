#!/usr/bin/env bash

# 设置环境变量

export PYTHONPATH=$(pwd):$PYTHONPATH
# export PYTHONPATH=~/_env/lib/general:$PYTHONPATH


# python setup.py install
pip install -r requirements.txt



# 设置virtualenv
