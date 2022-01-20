import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FaviconRef } from 'src/app/core/svg/favicon-ref.enum';

@Injectable({ providedIn: 'root' })
export class FaviconService {
	private readonly head: HTMLHeadElement;
	private readonly renderer: Renderer2;

	public constructor(
		@Inject(DOCUMENT) private readonly document: Document,
		private readonly rendererFactory: RendererFactory2,
	) {
		this.head = this.document.head;
		this.renderer = this.rendererFactory.createRenderer(this.head, null);

		this.replaceFavicon(FaviconRef.getDefault());
	}

	private replaceFavicon(faviconRef: FaviconRef): void {
		const favicon = this.favicon;

		if (favicon?.getAttribute('href') !== faviconRef) {
			this.removeFavicon(favicon);
			this.addFavicon(faviconRef);
		}
	}

	private removeFavicon(favicon: HTMLLinkElement | null): void {
		if (favicon instanceof HTMLLinkElement) {
			this.renderer.removeChild(this.head, favicon);
		}
	}

	private addFavicon(faviconRef: FaviconRef): void {
		const favicon = this.renderer.createElement('link');

		FaviconRef.getAttributes(faviconRef).forEach(([ attribute, value ]) =>
			this.renderer.setAttribute(favicon, attribute, value));

		this.renderer.insertBefore(this.head, favicon, this.appleTouchIcon);
	}

	private get favicon(): HTMLLinkElement | null {
		return this.head.querySelector('link[rel="icon"]');
	}

	private get appleTouchIcon(): HTMLLinkElement | null {
		return this.head.querySelector('link[rel="apple-touch-icon"]');
	}
}
