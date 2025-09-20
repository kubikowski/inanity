#!/bin/bash

function get_magick_version {
	which -s identify && echo 6 && return;
	which -s magick && echo 7 && return;
}

function check_magick_version {
	case "$(get_magick_version)" in
		6) log_info "ImageMagick version 6 detected" ;;
		7) log_info "ImageMagick version 7 detected. Aliasing for version 6 cli";
			shopt -s expand_aliases;
			alias convert='magick'
			alias identify='magick identify';
			;;
		*) log_error "Missing dependency: ImageMagick" && exit 1 ;;
	esac
}
