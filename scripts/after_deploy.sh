#!/bin/bash
#curl -k -d "{'name':$1, 'version':$2, 'source':'npm'}" -H "Content-Type: application/json" -X POST https://jenkins.ovp.kaltura.com/generic-webhook-trigger/invoke?token=$3
curl -k -d "{'version':$2}" -H "Content-Type: application/json" -X POST https://jenkins-central.prod.ovp.kaltura.com/generic-webhook-trigger/invoke?token=$3
