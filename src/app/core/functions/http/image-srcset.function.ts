import { ImageLoader, ImageLoaderConfig } from '@angular/common';
import { union } from 'set-utilities';

export abstract class ImageSrcset {

	public static readonly placeholderWidth = 48;
	public static readonly breakpointWidths = [
		720,
		1080,
		1920,
	] as const;

	/**
	 * Gets a list of available image widths, from the images original width.
	 * @example
	 * 1738 => [ 720, 1080, 1738 ];
	 */
	private static getImageSrcsetWidths(originalWidth: number): number[] {
		return Array.from(union(new Set(this.breakpointWidths), new Set([ originalWidth ])))
			.filter(width => width <= originalWidth);
	}

	/**
	 * Gets a formatted string of image widths, for use with `[ngSrcset]`.
	 * @example
	 * 1738 => '720w, 1080w, 1738w';
	 */
	public static getImageSrcset(originalWidth: number): string {
		return this.getImageSrcsetWidths(originalWidth)
			.map(width => `${ width }w`)
			.join(', ');
	}

	/**
	 * Gets an `image-set()` containing a list of `url()`, for CSS `background-image`.
	 * @example
	 * ('a/b/c.png', 1738) => `image-set(
	 *     url('a/b/c_1080w.png') 1x,
	 *     url('a/b/c.png') 2x)`;
	 */
	public static getImageSet(src: string, originalWidth: number): string {
		const imageUrls = this.getImageSrcsetWidths(originalWidth).slice(-2)
			.map(width => this.getImageURI(src, width, originalWidth))
			.map((imageUri, index) => `url(${ imageUri }) ${ index + 1 }x`);

		return `image-set(${ imageUrls.join(', ') })`;
	}

	/**
	 * Formats an image's URI based on requested and original widths.
	 * @example
	 * ('a/b/c.png', 720, 1920) => 'a/b/c_720w.png';
	 * @example
	 * ('a/b/c.png', 1920, 1920) => 'a/b/c.png';
	 */
	private static getImageURI(src: string, requestedWidth?: number, originalWidth?: number): string {
		if (typeof requestedWidth !== 'undefined' && requestedWidth !== originalWidth) {
			const filePathSplit = src.split('.');
			const fileExtension = filePathSplit.pop();
			const fileName = filePathSplit.join('.');

			return `${ fileName }_${ requestedWidth }w.${ fileExtension }`;
		} else {
			return src;
		}
	}

	/**
	 * Gets the `ImageLoader` function provided for Angular's `NgOptimizedImage`.
	 */
	public static getImageLoader(): ImageLoader {
		return (config: ImageLoaderConfig): string => {
			const { src, width: requestedWidth } = config;
			const originalWidth = config.loaderParams?.['originalWidth'] as number | undefined;

			return this.getImageURI(src, requestedWidth, originalWidth);
		};
	}
}
