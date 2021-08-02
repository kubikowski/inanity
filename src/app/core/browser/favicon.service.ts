import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FaviconService {

	constructor(
		@Inject(DOCUMENT) private readonly document: HTMLDocument,
	) {
		this.initializeFavicon();
	}

	private initializeFavicon(): void {
		const favicon = this.document.getElementById('favicon');

		if (favicon.getAttribute('href') !== environment.iconRef) {
			this.removeFavicon();
			this.addFavicon();
		}
	}

	private removeFavicon(): void {
		const favicon = this.document.getElementById('favicon');

		favicon.parentNode.removeChild(favicon);
	}

	private addFavicon(): void {
		const favicon = this.document.createElement('link');

		favicon.setAttribute('id', 'favicon');
		favicon.setAttribute('rel', 'icon');
		favicon.setAttribute('type', 'image/svg+xml');
		favicon.setAttribute('href', environment.iconRef);

		this.document.head.appendChild(favicon);
	}
}
