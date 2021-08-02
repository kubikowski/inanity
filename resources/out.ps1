$Out = "out";

function add-out-directory() {
	if (-Not(Test-Path -Path $Out)) {
		New-Item `
			-Path . `
			-Name "$Out" `
			-ItemType "directory" `
			> $null;
	}
}

function remove-out-directory() {
	Remove-Item "$Out" -Recurse -Force;
}
