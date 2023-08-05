#!/bin/bash

if [ $# -lt 3 ]
then
    echo "Usage : $0 <client addr> <server addr> <port>"
    exit
fi

c_addr=$1
s_addr=$2
port=$3

if [ ! -f iperf-3.0.11-source.tar.gz ]
then
    curl --insecure -Os https://iperf.fr/download/iperf_3.0/iperf-3.0.11-source.tar.gz
fi

if [ ! -f ./iperf-3.0.11/src/iperf3 ]
then
    tar -xvzf iperf-3.0.11-source.tar.gz
    cd iperf-3.0.11
    ./configure
    make
    cd ..
fi

./iperf-3.0.11/src/iperf3 -c $s_addr -p $port -J > ${c_addr}-${s_addr}.json
