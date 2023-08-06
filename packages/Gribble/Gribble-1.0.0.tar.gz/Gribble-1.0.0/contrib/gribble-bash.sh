#!/bin/bash

export GRIBBLE_MODE=connect

## Individual files to send
#export GRIBBLE_FILES=/var/log/syslog

## Send all files under path
#export GRIBBLE_PATH=/var/log

## Redis
#export GRIBBLE_TRANSPORT=redis
#export REDIS_NAMESPACE='logstash'
#export REDIS_URL='redis://redis:6379/0'

## ZeroMQ
#export ZEROMQ_ADDRESS='tcp://indexer:5556'

## RabbitMQ
#export RABBITMQ_HOST=rabbit
#export RABBITMQ_PORT=5672
#export RABBITMQ_VHOST='/'
#export RABBITMQ_USERNAME='guest'
#export RABBITMQ_PASSWORD='guest'
#export RABBITMQ_QUEUE='logstash-queue'
#export RABBITMQ_KEY='logstash-key'
#export RABBITMQ_EXCHANGE='logstash-exchange'

AFTER_CRASH_WAIT=20

{
while true
do
	/usr/local/bin/gribble
	## If you would prefer to use a config file, use this line instead
	#exec /usr/local/bin/gribble -c /etc/gribble/conf

	echo "$0: Waiting for $AFTER_CRASH_WAIT seconds before retrying."
	sleep $AFTER_CRASH_WAIT
done

} > /var/log/gribble.log 2>&1
