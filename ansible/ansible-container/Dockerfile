FROM centos:centos7.4.1708

RUN  yum check-update; \
   yum install -y gcc libffi-devel python-devel openssl-devel epel-release; \
   yum install -y python-pip python-wheel; \
   pip install --upgrade pip;

RUN  pip install ansible;
