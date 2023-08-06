#!/bin/bash
#
# gribble      Startup script for gribble.
#
# chkconfig: 2345 13 87
# description: gribble is the facility by which logs are delivered to logstash
### BEGIN INIT INFO
# Provides: $gribble
# Required-Start: $syslog
# Required-Stop: $local_fs
# Default-Start:  2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Logstash shipper
# Description: Gribble is a small python utility for shipping logs to logstash
### END INIT INFO

# Source function library.
. /etc/init.d/functions

RETVAL=0
PIDFILE=/var/run/gribble.pid

prog=gribble
exec=/usr/bin/gribble
lockfile=/var/lock/subsys/$prog

# Source config
if [ -f /etc/sysconfig/$prog ] ; then
    . /etc/sysconfig/$prog
fi

GRIBBLE_CONFIG=${GRIBBLE_CONFIG:-/etc/gribble/conf}

start() {
    [ -x $exec ] || exit 5
    [ -f $GRIBBLE_CONFIG ] || exit 7

    umask 077

    echo -n $"Starting gribble: "
    daemon $exec -D -P $PIDFILE -c $GRIBBLE_CONFIG $GRIBBLE_OPTIONS
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && touch $lockfile
    return $RETVAL
}
stop() {
    echo -n $"Shutting down gribble: "
    killproc -p "$PIDFILE" $exec
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && rm -f $lockfile
    return $RETVAL
}
rhstatus() {
    status -p "$PIDFILE" -l $prog $exec
}
restart() {
    stop
    start
}
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        restart
        ;;
  reload)
        exit 3
        ;;
  force-reload)
        restart
        ;;
  status)
        rhstatus
        ;;
  condrestart|try-restart)
        rhstatus >/dev/null 2>&1 || exit 0
        restart
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart|condrestart|try-restart|reload|force-reload|status}"
        exit 3
esac

exit $?
