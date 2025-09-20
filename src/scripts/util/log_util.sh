#!/bin/bash

function log_success {
    echo -e "$(bold "$(green "SUCCESS")"): $*";
}

function log_info {
    echo -e "$(bold "$(blue "INFO")"): $*";
}

function log_warning {
    echo -e "$(bold "$(yellow "WARNING")"): $*";
}

function log_error {
    echo -e "$(bold "$(red "ERROR")"): $*" >&2;
}

function log_status {
    local -ri status="${2:-$?}";
    local -r method_name="${1:-${FUNCNAME[1]}}";

    case $status in
        0) log_success "$method_name Completed" ;;
        130) log_warning "$method_name Interrupted" ;;
        *) log_error "$method_name Failed" ;;
    esac

    return $status;
}
