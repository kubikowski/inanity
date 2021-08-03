import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FaviconRef } from 'src/app/core/svg/favicon-ref.enum';

@Injectable({ providedIn: 'root' })
export class FaviconService {
	private readonly renderer: Renderer2;

	constructor(
		@Inject(DOCUMENT) private readonly document: HTMLDocument,
		private readonly rendererFactory: RendererFactory2,
	) {
		this.renderer = this.rendererFactory.createRenderer(this.document.head, null);

		this.replaceFavicon(FaviconRef.getDefault());
	}

	private replaceFavicon(faviconRef: FaviconRef): void {
		const favicon = this.favicon;

		if (favicon?.getAttribute('href') !== faviconRef) {
			this.removeFavicon(favicon);
			this.addFavicon(faviconRef);
		}
	}

	private removeFavicon(favicon: HTMLLinkElement): void {
		if (typeof favicon !== 'undefined')
			this.renderer.removeChild(this.document.head, favicon);
	}

	private addFavicon(faviconRef: FaviconRef): void {
		const favicon = this.renderer.createElement('link');

		this.renderer.setAttribute(favicon, 'rel', 'icon');
		this.renderer.setAttribute(favicon, 'type', 'image/svg+xml');
		this.renderer.setAttribute(favicon, 'href', faviconRef);

		this.renderer.appendChild(this.document.head, favicon);
	}

	private get favicon(): HTMLLinkElement {
		return Array.from(this.favicons)
			.find(favicon => favicon.getAttribute('type') === 'image/svg+xml');
	}

	private get favicons(): NodeListOf<HTMLLinkElement> {
		return this.document.head.querySelectorAll('link[rel="icon"]');
	}
}
