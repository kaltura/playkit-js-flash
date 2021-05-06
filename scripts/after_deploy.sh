#!/bin/bash
set -x
#curl -k -d "{'name':$1, 'version':$2, 'source':'npm'}" -H "Content-Type: application/json" -X POST https://jenkins.ovp.kaltura.com/generic-webhook-trigger/invoke?token=$3
echo $3
curl ifconfig.me
curl -k -d "{'version':$2}" -H "Content-Type: application/json" -X POST https://jenkins-central.prod.ovp.kaltura.com/generic-webhook-trigger/invoke?token=$3
