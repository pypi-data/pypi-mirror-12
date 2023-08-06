#!/bin/bash

set -e

./translate.py compile
tox
echo
echo "==> Ready to release!"
