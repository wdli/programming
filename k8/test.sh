#!/bin/bash
#



while true; do
	sleep 1
	curl http://localhost:5001 2> /dev/null
	[  $? != 0 ] && { echo "Connection failed to k8"; } 

done
