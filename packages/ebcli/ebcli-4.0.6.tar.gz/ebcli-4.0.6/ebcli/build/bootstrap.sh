#!/bin/bash

# Exit on error
set -e

if [[ -e /etc/redhat-release || -e /etc/system-release ]]; then
    yum -y install epel-release
    yum -y install python-pip curl
else
    export DEBIAN_FRONTEND=noninteractive
    apt-get -y update;
    apt-get -y install python-pip curl
    apt-get -y clean
fi

pip install --no-compile --user -r ${ELASTICBOX_PATH}/requirements.txt
ln -snf ${ELASTICBOX_PATH}/elasticbox.sh /usr/bin/elasticbox
