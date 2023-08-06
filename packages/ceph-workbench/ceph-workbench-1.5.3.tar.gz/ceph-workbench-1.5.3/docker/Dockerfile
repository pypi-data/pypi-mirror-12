FROM ubuntu:14.04
MAINTAINER Loic Dachary "loic@dachary.org"

RUN apt-get update
RUN apt-get install -y python-virtualenv
RUN pip install ceph-workbench

ENTRYPOINT ["ceph-workbench"]
