import { IMAGE_CONFIG, IMAGE_LOADER } from '@angular/common';
import { ValueProvider } from '@angular/core';
import { imageLoader } from 'src/app/core/functions/http/image-loader.function';
import { imagePlaceholderWidth, imageSrcsetWidths } from 'src/app/core/functions/http/image-srcset.function';

const imageLoaderProvider: ValueProvider = {
	provide: IMAGE_LOADER,
	useValue: imageLoader,
};

const imageConfigProvider: ValueProvider = {
	provide: IMAGE_CONFIG,
	useValue: {
		breakpoints: imageSrcsetWidths,
		placeholderResolution: imagePlaceholderWidth,
	},
};

export function provideImages(): ValueProvider[] {
	return [
		imageLoaderProvider,
		imageConfigProvider,
	];
}
