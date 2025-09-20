#!/bin/bash

if [[ -z "$SCRIPTS_PATH" ]]; then
	declare -xr SCRIPTS_PATH="./src/scripts";
fi

if [[ -z "$UTIL_PATH" ]]; then
	declare -xr UTIL_PATH="$SCRIPTS_PATH/util";
fi

source "$UTIL_PATH/ansi_util.sh";
source "$UTIL_PATH/cd_util.sh";
source "$UTIL_PATH/log_util.sh";
