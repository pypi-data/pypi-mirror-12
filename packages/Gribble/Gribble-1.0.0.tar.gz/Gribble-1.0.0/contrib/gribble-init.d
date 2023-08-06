#!/bin/bash -
### BEGIN INIT INFO
# Provides:          gribble
# Required-Start:    $local_fs $remote_fs $network
# Required-Stop:     $local_fs $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start up the Gribble at boot time
# Description:       Enable Log Sender provided by gribble.
### END INIT INFO


GRIBBLE_NAME='gribble'
GRIBBLE_CMD='gribble -t stdout -c /etc/gribble/gribble.conf'
RUNDIR='/var/run/gribble'
GRIBBLE_PID=${RUNDIR}/logstash_gribble.pid
GRIBBLE_USER='gribble'
LOGDIR='/var/log/gribble'
GRIBBLE_LOG=${LOGDIR}/logstash_gribble.log


PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
export PATH
IFS=$' \t\n'
export IFS

GRIBBLE_BIN="$(which "${GRIBBLE_NAME}")"

[ -r /etc/init.d/functions ] && . /etc/init.d/functions
[ -r /lib/lsb/init-functions ] && . /lib/lsb/init-functions
[ -r "/etc/default/${GRIBBLE_NAME}" ] && . "/etc/default/${GRIBBLE_NAME}"

do_start() {
    test -f "${GRIBBLE_BIN}" || exit 0
    if is_up
    then
        echo $'Log Sender server daemon already started.'
        return 0
    fi
    mkdir -p $RUNDIR
    chown $GRIBBLE_USER $RUNDIR
    mkdir -p $LOGDIR
    chown $GRIBBLE_USER $LOGDIR
    echo -n $"Log Sender server daemon: ${GRIBBLE_NAME}"
    su - "${GRIBBLE_USER}" -s '/bin/bash' -c "${GRIBBLE_CMD} >> ${GRIBBLE_LOG} 2>&1 & echo \$! > ${GRIBBLE_PID}"
    echo '.'
}

do_stop() {
    test -f "${GRIBBLE_BIN}" || exit 0
    if ! is_up
    then
        echo $'Log Sender server daemon already stopped.'
        return 0
    fi
    echo -n $"Stopping Log Sender server daemon: ${GRIBBLE_NAME}"
    do_kill
    while is_up
    do
        echo -n '.'
        sleep 1
    done
    echo '.'
}

gribble_pid() {
    tail -1 "${GRIBBLE_PID}" 2> /dev/null
}

is_up() {
    PID="$(gribble_pid)"
    [ x"${PID}" != x ] && ps -p "${PID}" -o comm h 2> /dev/null | grep -qFw "${GRIBBLE_NAME}"
}

do_kill() {
    PID="$(gribble_pid)"
    [ x"${PID}" != x ] && su - "${GRIBBLE_USER}" -c "kill -TERM ${PID}"
}

do_restart() {
    test -f "${GRIBBLE_BIN}" || exit 0
    do_stop
    sleep 1
    do_start
}

do_status() {
    test -f "${GRIBBLE_BIN}" || exit 0
    if is_up
    then
        echo "${GRIBBLE_NAME} is running."
        exit 0
    else
        echo "${GRIBBLE_NAME} is not running."
        exit 1
    fi
}

do_usage() {
    echo $"Usage: $0 {start | stop | restart | force-reload | status}"
    exit 1
}

case "$1" in
start)
    do_start
    exit "$?"
    ;;
stop)
    do_stop
    exit "$?"
    ;;
restart|force-reload)
    do_restart
    exit "$?"
    ;;
status)
    do_status
    ;;
*)
    do_usage
    ;;
esac
