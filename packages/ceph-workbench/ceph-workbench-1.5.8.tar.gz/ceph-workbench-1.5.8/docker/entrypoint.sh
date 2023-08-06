#!/bin/bash

usermod --uid $USER_ID ubuntu 2>&1 | grep -v 'no changes'
openrc=/home/ubuntu/.ceph-workbench/openrc.sh
if [ -f $openrc ] ; then
    source $openrc
fi
sudo --set-home --preserve-env --user ubuntu "$@"
