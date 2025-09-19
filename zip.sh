#!/bin/bash

cd build
for dir in */; do
    name="${dir%/}"
    cd $dir
    zip -r -q "../ext-saladict-${name}.zip" "."
    cd ..
done