# CentOS + python3.6 + nginx

FROM centos:latest
MAINTAINER Kir Chou <note351@hotmail.com>

# Update yum
RUN yum -y update

# Install dependencies
RUN yum groupinstall -y "Development tools"
RUN yum install -y zlib-devel bzip2-devel openssl-devel sqlite-devel

# Install wget
RUN yum install -y wget

# Install Python 3.6.1
RUN wget http://python.org/ftp/python/3.6.1/Python-3.6.1rc1.tar.xz
RUN tar xf Python-3.6.1rc1.tar.xz
WORKDIR Python-3.6.1rc1
RUN ./configure --prefix=/usr/local --enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib"
RUN make && make altinstall
WORKDIR ..
RUN rm -rf Python-3.6.1rc1 Python-3.6.1rc1.tar.xz

# Install virtualenv
RUN pip3.6 install virtualenv

# Install nginx
RUN yum install -y epel-release
RUN yum install -y nginx

# Install nodejs
RUN yum install -y nodejs

# Download project
WORKDIR /srv
RUN git clone https://github.com/note35/osu-map-viewer.git

# Install node_modules
WORKDIR /srv/osu-map-viewer/viewer
RUN npm install
ADD ./docker_config/webpack.config.js .
ADD ./docker_config/mapsetAction.js src/js/actions/mapsetAction.js
EXPOSE 8080

# Install requirement
WORKDIR /srv/osu-map-viewer/processor
RUN whereis pip3
RUN /usr/local/bin/pip3.6 install -r requirement.txt
RUN /usr/local/bin/python3.6 manage.py migrate
ADD ./docker_config/settings.py processor/settings.py
EXPOSE 8000

#EXPOSE 80
