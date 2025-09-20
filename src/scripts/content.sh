#!/bin/bash

source "./src/scripts/util/util.sh";

italic '\n❯ import_content.sh:';
bash "./src/scripts/import_content.sh" || exit $?;

italic '\n❯ srcset_images.sh:';
bash "./src/scripts/srcset_images.sh" || exit $?;
