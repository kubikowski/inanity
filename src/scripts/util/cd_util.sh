#!/bin/bash

function cd_back {
    cd "$OLDPWD" || {
        log_error "cd_back Failed";
        return 1;
    }
}
