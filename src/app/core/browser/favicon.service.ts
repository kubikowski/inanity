import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FaviconRef } from 'src/app/core/svg/favicon-ref.enum';

@Injectable({ providedIn: 'root' })
export class FaviconService {
	private readonly head: HTMLHeadElement;
	private readonly renderer: Renderer2;

	constructor(
		@Inject(DOCUMENT) private readonly document: HTMLDocument,
		private readonly rendererFactory: RendererFactory2,
	) {
		this.head = this.document.head;
		this.renderer = this.rendererFactory.createRenderer(this.head, null);

		this.replaceFavicon(FaviconRef.getDefault());
	}

	private replaceFavicon(faviconRef: FaviconRef): void {
		const favicon = this.svgFavicon;

		if (favicon?.getAttribute('href') !== faviconRef) {
			this.removeFavicon(favicon);
			this.addFavicon(faviconRef);
		}
	}

	private removeFavicon(favicon: HTMLLinkElement): void {
		if (typeof favicon !== 'undefined')
			this.renderer.removeChild(this.head, favicon);
	}

	private addFavicon(faviconRef: FaviconRef): void {
		const favicon = this.renderer.createElement('link');

		this.renderer.setAttribute(favicon, 'rel', 'icon');
		this.renderer.setAttribute(favicon, 'type', 'image/svg+xml');
		this.renderer.setAttribute(favicon, 'href', faviconRef);

		this.renderer.insertBefore(this.head, favicon, this.appleTouchIcon);
	}

	private get svgFavicon(): HTMLLinkElement {
		return Array.from(this.favicons)
			.find(favicon => favicon.getAttribute('type') === 'image/svg+xml');
	}

	private get appleTouchIcon(): HTMLLinkElement {
		return Array.from(this.favicons)
			.find(favicon => favicon.getAttribute('type') === 'apple-touch-icon');
	}

	private get favicons(): NodeListOf<HTMLLinkElement> {
		return this.head.querySelectorAll('link[rel="icon"]');
	}
}
