export function titleCase(input: string): string {
	return input
		.toLowerCase()
		.split(/[ _-]+/g)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
