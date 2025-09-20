
import { ImageLoaderConfig } from '@angular/common';

/**
 * TODO: set up post-build CDN procedure
 *  to generate downsized images at preset widths.
 *  -
 *  We may need to account for widths being requested specifically,
 *  where the original file is not named with such an ext.
 */
export function imageLoader(config: ImageLoaderConfig): string {
	const { src, width } = config;
	const originalWidth = config.loaderParams?.['originalWidth'] as number | undefined;

	if (typeof width !== 'undefined' && width !== originalWidth) {
		const filePathSplit = src.split('.');
		const fileExtension = filePathSplit.pop();
		const fileName = filePathSplit.join('.');

		return `${ fileName }_${ width }w.${ fileExtension }`;
	} else {
		return src;
	}
}
