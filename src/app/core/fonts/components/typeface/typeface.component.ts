import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FontService } from 'src/app/core/fonts/services/font.service';
import { timeout } from 'src/app/core/functions/promise/timeout.function';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { NotificationService } from 'src/app/core/notifications/notification.service';
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
	private readonly notificationService = inject(NotificationService);

	public readonly typeface = input.required<Typeface>();
	public readonly classification = computed(() => getTypefaceClassificationCss(this.typeface().classification));

	private readonly isApplied = computed(() => this.fontService.typeface() === this.typeface());
	private readonly shouldApply = signal(false);

	// TODO: this solution is getting closer and closer to working...
	//  currently, this work for spamming the same typeface.
	//  but alternating between two doesn't work.
	private readonly shouldRemove = signal(true);

	private readonly isDefaultApplied = computed(() => this.fontService.typeface() === FontService.DEFAULT_TYPEFACE);
	private readonly canUnapply = computed(() => this.isApplied());

	public constructor() {
		effect(() => {
			if (this.shouldApply() && !this.isApplied()) {
				this.fontService.typeface.set(this.typeface());
			}

			if (!this.shouldApply() && this.isApplied()) {
				if (untracked(this.shouldRemove)) {
					if (this.typeface() !== FontService.DEFAULT_TYPEFACE) {
						this.fontService.typeface.set(FontService.DEFAULT_TYPEFACE);
					}
				} else {
					this.shouldRemove.set(true);
				}
			}
		}, allowWrites);
	}

	public async applyTypeface(): Promise<void> {
		if (!this.isApplied()) {
			this.shouldApply.set(true);
			await this.notificationService.notify('we don\'t do that here...');
		} else {
			this.shouldRemove.set(false);
			await timeout();
		}

		this.shouldApply.set(false);
	}
}
