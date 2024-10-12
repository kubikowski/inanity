import { environment } from 'src/environments/environment';

export enum FaviconRef {
	DEV_DEFAULT = 'assets/icon/inanity.dev.svg',
	PROD_DEFAULT = 'assets/icon/inanity.svg',
}

export abstract class FaviconUtil {
	public static getDefault(): FaviconRef {
		return environment.production
			? FaviconRef.PROD_DEFAULT
			: FaviconRef.DEV_DEFAULT;
	}

	public static getAttributes(faviconRef: FaviconRef): [ string, string ][] {
		return Object.entries({
			rel: 'icon',
			type: 'image/svg+xml',
			sizes: 'any',
			href: faviconRef,
		});
	}
}
