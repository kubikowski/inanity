import { environment } from 'src/environments/environment';

export enum FaviconRef {
	DEV_DEFAULT = 'assets/icon/inanity.dev.svg',
	PROD_DEFAULT = 'assets/icon/inanity.svg',
}

export namespace FaviconRef {
	export function getDefault(): FaviconRef {
		return environment.production
			? FaviconRef.PROD_DEFAULT
			: FaviconRef.DEV_DEFAULT;
	}
}
