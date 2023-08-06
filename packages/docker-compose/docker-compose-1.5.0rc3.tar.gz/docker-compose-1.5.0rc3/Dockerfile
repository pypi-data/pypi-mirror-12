FROM debian:wheezy

RUN set -ex; \
    apt-get update -qq; \
    apt-get install -y \
        locales \
        gcc \
        make \
        zlib1g \
        zlib1g-dev \
        libssl-dev \
        git \
        ca-certificates \
        curl \
        libsqlite3-dev \
    ; \
    rm -rf /var/lib/apt/lists/*

RUN curl https://get.docker.com/builds/Linux/x86_64/docker-latest \
        -o /usr/local/bin/docker && \
    chmod +x /usr/local/bin/docker

# Build Python 2.7.9 from source
RUN set -ex; \
    curl -LO https://www.python.org/ftp/python/2.7.9/Python-2.7.9.tgz; \
    tar -xzf Python-2.7.9.tgz; \
    cd Python-2.7.9; \
    ./configure --enable-shared; \
    make; \
    make install; \
    cd ..; \
    rm -rf /Python-2.7.9; \
    rm Python-2.7.9.tgz

# Build python 3.4 from source
RUN set -ex; \
    curl -LO https://www.python.org/ftp/python/3.4.3/Python-3.4.3.tgz; \
    tar -xzf Python-3.4.3.tgz; \
    cd Python-3.4.3; \
    ./configure --enable-shared; \
    make; \
    make install; \
    cd ..; \
    rm -rf /Python-3.4.3; \
    rm Python-3.4.3.tgz

# Make libpython findable
ENV LD_LIBRARY_PATH /usr/local/lib

# Install setuptools
RUN set -ex; \
    curl -LO https://bootstrap.pypa.io/ez_setup.py; \
    python ez_setup.py; \
    rm ez_setup.py

# Install pip
RUN set -ex; \
    curl -LO https://pypi.python.org/packages/source/p/pip/pip-7.0.1.tar.gz; \
    tar -xzf pip-7.0.1.tar.gz; \
    cd pip-7.0.1; \
    python setup.py install; \
    cd ..; \
    rm -rf pip-7.0.1; \
    rm pip-7.0.1.tar.gz

# Python3 requires a valid locale
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8

RUN useradd -d /home/user -m -s /bin/bash user
WORKDIR /code/

RUN pip install tox==2.1.1

ADD requirements.txt /code/
ADD requirements-dev.txt /code/
ADD .pre-commit-config.yaml /code/
ADD setup.py /code/
ADD tox.ini /code/
ADD compose /code/compose/
RUN tox --notest

ADD . /code/
RUN chown -R user /code/

ENTRYPOINT ["/code/.tox/py27/bin/docker-compose"]
