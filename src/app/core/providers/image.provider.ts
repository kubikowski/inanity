import { IMAGE_CONFIG, IMAGE_LOADER } from '@angular/common';
import { ValueProvider } from '@angular/core';
import { ImageSrcset } from 'src/app/core/functions/http/image-srcset.function';

const imageLoaderProvider: ValueProvider = {
	provide: IMAGE_LOADER,
	useValue: ImageSrcset.getImageLoader(),
};

const imageConfigProvider: ValueProvider = {
	provide: IMAGE_CONFIG,
	useValue: {
		breakpoints: ImageSrcset.breakpointWidths,
		placeholderResolution: ImageSrcset.placeholderWidth,
	},
};

export function provideImages(): ValueProvider[] {
	return [
		imageLoaderProvider,
		imageConfigProvider,
	];
}
