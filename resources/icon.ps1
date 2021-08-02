# Full Scaling
#$FaviconSizes = 16, 32, 48, 72, 96, 128, 144, 152, 167, 180, 192, 196, 512;

# Magick Default Output
#$FaviconSizes = 256, 192, 128, 96, 64, 48, 40, 32, 24, 16;

# Browser Legacy
$FaviconSizes = 32, 16;

$Out = "out";

function export-favicon() {
	Param (
		[Parameter(Mandatory = $true)][string] $SvgFile,
		[Parameter(Mandatory = $false)][int[]] $Sizes = $FaviconSizes
	)

	export-pngs $SvgFile $Sizes;
	compress-pngs $Sizes;
	convert-favicon $Sizes;
	remove-out-directory;
}

function export-pngs() {
	Param (
		[Parameter(Mandatory = $true)][string] $SvgFile,
		[Parameter(Mandatory = $false)][int[]] $Sizes = $FaviconSizes
	)

	add-out-directory;

	foreach ($Size in $Sizes) {
		export-png $SvgFile $Size;
	}
}

function export-png() {
	Param (
		[Parameter(Mandatory = $true)][string] $SvgFile,
		[Parameter(Mandatory = $true)][int] $Size
	)

	inkscape `
		-p "$SvgFile" `
		-o "$Out\favicon-$Size.png" `
		-w "$Size" `
		-h "$Size";
}

function compress-pngs() {
	Param ([Parameter(Mandatory = $false)][int[]] $Sizes = $FaviconSizes)

	$PngFiles = $Sizes | Foreach-Object { [string]::Format("$Out\favicon-{0}.png", $_) };

	$PngFiles | ForEach-Object { compress-png $_ }
}

function compress-png() {
	Param ([Parameter(Mandatory = $true)][string] $PngFile)

	optipng -o7 $PngFile;
#	pngquant -f --ext .png $Pngs --posterize 4 --speed 1;
}

function convert-favicon() {
	Param ([Parameter(Mandatory = $false)][int[]] $Sizes = $FaviconSizes)

	$PngFiles = $Sizes | Foreach-Object { [string]::Format("$Out\favicon-{0}.png", $_) };

	magick convert $PngFiles favicon.ico;
}


function export-favicon-only-magick() {
	Param (
		[Parameter(Mandatory = $true)][string] $SvgFile,
		[Parameter(Mandatory = $false)][int[]] $Sizes = $FaviconSizes
	)

	magick `
		-density 256x256 `
		-background transparent `
		"$SvgFile" `
		-define icon:auto-resize `
		-colors 256 `
		favicon.ico;
}
