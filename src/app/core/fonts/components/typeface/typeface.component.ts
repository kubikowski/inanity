import { Component, computed, inject, input } from '@angular/core';
import { FontService } from 'src/app/core/fonts/services/font.service';
import { getTypefaceClassificationCss } from '../../models/typeface-classification.enum';
import { Typeface } from '../../models/typeface.model';

@Component({
	selector: 'typeface',
	templateUrl: 'typeface.component.html',
	styleUrl: 'typeface.component.scss',
	standalone: true,
	host: {
		'[style.font-family]': 'classification()',
	},
})
export class TypefaceComponent {
	private readonly fontService = inject(FontService);

	public readonly typeface = input.required<Typeface>();
	public readonly classification = computed(() => getTypefaceClassificationCss(this.typeface().classification));

	public applyTypeface(): void {
		this.fontService.typeface.set(this.typeface());
	}
}
