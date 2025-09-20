#!/bin/bash

# region Text Attribute Functions
function bold {
    local -r ansi_bold="\033[1m";
    local -r ansi_weight_off="\033[22m";
    echo -e "$ansi_bold""$*""$ansi_weight_off";
}
function faint {
    local -r ansi_faint="\033[2m";
    local -r ansi_weight_off="\033[22m";
    echo -e "$ansi_faint""$*""$ansi_weight_off";
}
function italic {
    local -r ansi_italic="\033[3m";
    local -r ansi_italic_off="\033[23m";
    echo -e "$ansi_italic""$*""$ansi_italic_off";
}
function underscore {
    local -r ansi_underscore="\033[4m";
    local -r ansi_underscore_off="\033[24m";
    echo -e "$ansi_underscore""$*""$ansi_underscore_off";
}
function blink {
    local -r ansi_blink="\033[5m";
    local -r ansi_blink_off="\033[25m";
    echo -e "$ansi_blink""$*""$ansi_blink_off";
}
function invert {
    local -r ansi_invert="\033[7m";
    local -r ansi_invert_off="\033[27m";
    echo -e "$ansi_invert""$*""$ansi_invert_off";
}
function conceal {
    local -r ansi_conceal="\033[8m";
    local -r ansi_conceal_off="\033[28m";
    echo -e "$ansi_conceal""$*""$ansi_conceal_off";
}
function strikethrough {
    local -r ansi_strikethrough="\033[9m";
    local -r ansi_strikethrough_off="\033[29m";
    echo -e "$ansi_strikethrough""$*""$ansi_strikethrough_off";
}
# endregion Text Attribute Functions

# region Foreground Color Functions
function black {
    local -r ansi_black="\033[30m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_black""$*""$ansi_foreground_off";
}
function red {
    local -r ansi_red="\033[31m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_red""$*""$ansi_foreground_off";
}
function green {
    local -r ansi_green="\033[32m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_green""$*""$ansi_foreground_off";
}
function yellow {
    local -r ansi_yellow="\033[33m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_yellow""$*""$ansi_foreground_off";
}
function blue {
    local -r ansi_blue="\033[34m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_blue""$*""$ansi_foreground_off";
}
function magenta {
    local -r ansi_magenta="\033[35m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_magenta""$*""$ansi_foreground_off";
}
function cyan {
    local -r ansi_cyan="\033[36m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_cyan""$*""$ansi_foreground_off";
}
function white {
    local -r ansi_white="\033[37m";
    local -r ansi_foreground_off="\033[39m";
    echo -e "$ansi_white""$*""$ansi_foreground_off";
}
# endregion Foreground Color Functions
