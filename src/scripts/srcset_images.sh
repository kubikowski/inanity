#!/bin/bash

source "./src/scripts/util/util.sh";
source "./src/scripts/util/magick_util.sh";

check_magick_version;

declare -r input_path="./src/assets/images";
declare -r output_path="./.assets/images";
declare -a output_image_widths=(48 720 1080 1920);

declare -a image_names;
readarray -t image_names < <(ls -1 "$input_path");

mkdir -p "$output_path";

declare image_name;
declare image_path;
declare -i input_image_width;
declare -i output_image_width;
declare -i status;

for image_name in "${image_names[@]}"; do
	image_path="$input_path/$image_name";
	input_image_width=$(identify -ping -format '%w' "$image_path");
	log_info "Resizing $image_name $(italic "[""$input_image_width""w original]")";

	for output_image_width in "${output_image_widths[@]}"; do
		if (( output_image_width < input_image_width )); then
			convert "$image_path" \
				-resize $output_image_width \
				-set filename:out '%[basename]_%[w]w.%[extension]' "$output_path/%[filename:out]";

			status=$?;
			log_status "Converted $image_name to $(italic "[""$output_image_width""w]")" $status;
		fi
	done
done
