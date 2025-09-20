#!/bin/bash

source "./src/scripts/util/util.sh";

declare -r temp=".sprinter";
declare -r assets="src/assets/sprinter";

declare -r local_content_repo="../sprinter";
declare -r upstream_content_repo="https://kubikowski@github.com/kubikowski/sprinter.git";

if [[ -d "$local_content_repo" ]]; then
	log_info "Fetching local content";
	cp -r "$local_content_repo" "$temp";

	declare -ri local_status=$?;
	log_status "Fetching local content" $local_status;
else
	log_info "Checking upstream content access";
	git ls-remote "$upstream_content_repo" --exit-code;

	declare -ri access_status=$?;
	log_status "Accessing upstream content" $access_status;

	if (( access_status == 0 )); then
		log_info "Fetching upstream content";
		git clone --depth "1" "$upstream_content_repo" "$temp";

		declare -ri import_status=$?;
		log_status "Fetching upstream content" $import_status;
	fi
fi

if [[ -d "$temp" ]]; then
	rm -rf "$assets";
	mkdir -p "$assets";

	if [[ -d "$temp/images" ]]; then
		cp -r "$temp/images" "$assets";
	fi
	if [[ -d "$temp/pages" ]]; then
		cp -r "$temp/pages" "$assets";
	fi

	rm -rf "$temp";
	log_status "Importing Content";
fi
