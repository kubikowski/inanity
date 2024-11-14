#!/bin/bash

declare -r temp=".sprinter";
declare -r assets="src/assets/sprinter";

declare -r local_content_repo="../sprinter";
declare -r upstream_content_repo="https://kubikowski@github.com/kubikowski/sprinter.git";

if [[ -d "$local_content_repo" ]]; then
	echo "Importing local content...";
	cp -r "$local_content_repo" "$temp";
else
	echo "Fetching upstream content...";
	git clone --depth "1" "$upstream_content_repo" "$temp";
fi

rm -rf "$assets";
mkdir -p "$assets";
cp -r "$temp/pages/." "$assets";
rm -rf "$temp";
