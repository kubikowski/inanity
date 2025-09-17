import { Component, computed, inject, input } from '@angular/core';
import { FontService } from 'src/app/core/fonts/services/font.service';
import { NotificationService } from 'src/app/core/notifications/notification.service';
import { getTypefaceClassificationCss } from '../../models/typeface-classification.enum';
import { Typeface } from '../../models/typeface.model';

@Component({
	selector: 'typeface',
	templateUrl: 'typeface.component.html',
	styleUrl: 'typeface.component.scss',
	host: {
		'[style.font-family]': 'classification()',
	},
})
export class TypefaceComponent {
	private readonly fontService = inject(FontService);
	private readonly notificationService = inject(NotificationService);

	public readonly typeface = input.required<Typeface>();
	public readonly classification = computed(() => getTypefaceClassificationCss(this.typeface().classification));

	public async applyTypeface(): Promise<void> {
		this.fontService.typeface.set(this.typeface());

		if (this.typeface() !== FontService.DEFAULT_TYPEFACE) {
			await this.notificationService.notify('we don\'t do that here...');
			this.fontService.typeface.set(FontService.DEFAULT_TYPEFACE);
		}
	}
}
