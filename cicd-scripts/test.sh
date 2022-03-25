#!/usr/bin/env bash

yarn install
yarn bootstrap

yarn affected:typecheck -s 1