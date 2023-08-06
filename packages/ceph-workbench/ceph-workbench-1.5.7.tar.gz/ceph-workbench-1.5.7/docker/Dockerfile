FROM ubuntu:14.04
MAINTAINER Loic Dachary "loic@dachary.org"

# nova.clouds will redirect to the fastest mirror
RUN sed -i -e 's|http://archive.ubuntu|http://nova.clouds.archive.ubuntu|' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y python-virtualenv git
RUN adduser --disabled-password --gecos Ubuntu --quiet ubuntu
RUN echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN cd /home/ubuntu ; git clone -b openstack http://github.com/dachary/teuthology
RUN cd /home/ubuntu/teuthology ; ./bootstrap install
RUN cd /home/ubuntu/teuthology ; python setup.py install
RUN pip install ceph-workbench
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
