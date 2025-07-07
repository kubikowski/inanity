import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, RendererFactory2, RendererStyleFlags2, signal } from '@angular/core';
import { getTypefaceClassificationCss } from 'src/app/core/fonts/models/typeface-classification.enum';
import { Typeface } from 'src/app/core/fonts/models/typeface.model';
import { EB_GARAMOND } from 'src/app/core/fonts/models/typefaces.constant';

@Injectable({ providedIn: 'root' })
export class FontService {
	private readonly document = inject(DOCUMENT);
	private readonly body = this.document.body;
	private readonly element = this.document.documentElement;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.body, null);

	public static readonly DEFAULT_TYPEFACE = EB_GARAMOND;
	public readonly typeface = signal(FontService.DEFAULT_TYPEFACE);

	public constructor() {
		effect(() => this.setTypeface(this.typeface()));
	}

	private setTypeface(typeface: Typeface) {
		this.renderer.setStyle(this.element, '--app-font', getTypefaceClassificationCss(typeface.classification), RendererStyleFlags2.DashCase);
	}
}
