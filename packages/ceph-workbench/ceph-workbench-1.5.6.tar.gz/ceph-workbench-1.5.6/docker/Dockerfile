FROM ubuntu:14.04
MAINTAINER Loic Dachary "loic@dachary.org"

RUN apt-get update
RUN apt-get install -y python-virtualenv git
RUN git clone -b openstack http://github.com/dachary/teuthology
RUN cd teuthology ; ./bootstrap install ; python setup.py install
RUN pip install ceph-workbench
