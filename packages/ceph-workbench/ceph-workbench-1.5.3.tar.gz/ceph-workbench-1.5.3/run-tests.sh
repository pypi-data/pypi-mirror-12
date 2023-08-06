#!/bin/bash

trap "bash tests/teardown.sh" EXIT

virtualenv virtualenv
source virtualenv/bin/activate
pip install tox requests
bash tests/setup.sh
tox
