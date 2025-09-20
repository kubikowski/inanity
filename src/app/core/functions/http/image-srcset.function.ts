import { union } from 'set-utilities';

export const imagePlaceholderWidth = 48;
export const imageSrcsetWidths = [
	720,
	1080,
	1920,
] as const;

export function imageSrcset(originalWidth: number): string {
	return Array.from(union(new Set(imageSrcsetWidths), new Set([ originalWidth ])))
		.filter(width => width <= originalWidth)
		.map(width => `${ width }w`)
		.join(', ');
}
