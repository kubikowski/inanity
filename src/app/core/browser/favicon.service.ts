import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { FaviconRef } from 'src/app/core/svg/favicon-ref.enum';

@Injectable({ providedIn: 'root' })
export class FaviconService {

	constructor(
		@Inject(DOCUMENT) private readonly document: HTMLDocument,
	) {
		this.replaceFavicon(FaviconRef.getDefault());
	}

	private replaceFavicon(faviconRef: FaviconRef): void {
		const favicon = this.document.getElementById('favicon');

		if (favicon?.getAttribute('href') !== faviconRef) {
			this.removeFavicon();
			this.addFavicon(faviconRef);
		}
	}

	private removeFavicon(): void {
		const favicon = this.document.getElementById('favicon');

		favicon?.parentNode.removeChild(favicon);
	}

	private addFavicon(faviconRef: FaviconRef): void {
		const favicon = this.document.createElement('link');

		favicon.setAttribute('id', 'favicon');
		favicon.setAttribute('rel', 'icon');
		favicon.setAttribute('type', 'image/svg+xml');
		favicon.setAttribute('href', faviconRef);

		this.document.head.appendChild(favicon);
	}
}
