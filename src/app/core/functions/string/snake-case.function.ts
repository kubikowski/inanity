export function snakeCase(input: string): string {
	return input
		.toLowerCase()
		.replaceAll(/[ _-]+/g, '_');
}
