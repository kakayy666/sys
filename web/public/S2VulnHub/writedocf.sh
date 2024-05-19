#!/bin/zsh

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <CVE>"
    exit 1
fi

CVE=$1

python cli.py reproduce -C ${CVE}