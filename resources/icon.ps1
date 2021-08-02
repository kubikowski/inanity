# Full Scaling
#$FaviconSizes = 16, 32, 48, 72, 96, 128, 144, 152, 167, 180, 192, 196, 512;/

# Magick Default Output
#$FaviconSizes = 256, 192, 128, 96, 64, 48, 40, 32, 24, 16;

# Browser Legacy
$FaviconSizes = 48, 32, 16;

$Out = "out";

function export-favicon() {
	Param ([Parameter(Mandatory = $true)][string] $SvgFile)

	export-pngs $SvgFile;
	compress-pngs;
	convert-favicon;
	remove-out-directory;
}

function export-pngs() {
	Param ([Parameter(Mandatory = $true)][string] $SvgFile)

	add-out-directory;

	foreach ($FaviconSize in $FaviconSizes) {
		export-png $SvgFile $FaviconSize;
	}
}

function export-png() {
	Param ([Parameter(Mandatory = $true)][string] $SvgFile, [Parameter(Mandatory = $true)][int] $Size)

	inkscape `
		-p "$SvgFile" `
		-o "$Out\favicon-$Size.png" `
		-w "$Size" `
		-h "$Size";
}

function compress-pngs() {
	$Pngs = ($FaviconSizes | Foreach-Object { [string]::Format("$Out\favicon-{0}.png", $_) });

	$Pngs | ForEach-Object { compress-png $_ }
}

function compress-png() {
	Param ([Parameter(Mandatory = $true)][string] $PngFile)

	optipng -o7 $PngFile;
#	pngquant -f --ext .png $Pngs --posterize 4 --speed 1;
}

function convert-favicon() {
	$Pngs = ($FaviconSizes | Foreach-Object { [string]::Format("$Out\favicon-{0}.png", $_) });

	magick convert $Pngs favicon.ico;
}


function export-favicon-only-magick() {
	Param ([Parameter(Mandatory = $true)][string] $SvgFile)

	magick `
		-density 256x256 `
		-background transparent `
		"$SvgFile" `
		-define icon:auto-resize `
		-colors 256 `
		favicon.ico;
}
