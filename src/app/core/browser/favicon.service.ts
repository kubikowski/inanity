import { DOCUMENT } from '@angular/common';
import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { FaviconRef, FaviconUtil } from 'src/app/core/svg/favicon-ref.enum';

@Injectable({ providedIn: 'root' })
export class FaviconService {
	private readonly head = inject(DOCUMENT).head;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.head, null);

	public constructor() {
		this.replaceFavicon(FaviconUtil.getDefault());
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
		const favicon = this.renderer.createElement('link') as HTMLLinkElement;

		FaviconUtil.getAttributes(faviconRef).forEach(([ attribute, value ]) =>
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
