#!/bin/bash

echo Removing unused vendor files to reduce space
rm vendor/google/grpc-gcp/cloudprober/bins/opt/grpc_php_plugin || true
rm vendor/symfony/validator/Resources/translations/*.xlf || true
