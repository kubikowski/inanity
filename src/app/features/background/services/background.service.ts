import { computed, effect, Injectable, signal } from '@angular/core';
import { BackgroundType } from 'src/app/features/background/models/background-type.enum';

@Injectable({ providedIn: 'root' })
export class BackgroundService {

	public static readonly minCalibration = 1;
	public static readonly maxCalibration = 20;

	public readonly type = signal(BackgroundService.persistType);
	public readonly isMovingBackground = computed(() => this.type() !== BackgroundType.BLANK);

	public readonly enabled = signal(BackgroundService.persistEnabled);
	public readonly amount = signal(BackgroundService.persistAmount);

	public constructor() {
		effect(() => {
			BackgroundService.persistType = this.type();
			BackgroundService.persistEnabled = this.enabled();
			BackgroundService.persistAmount = this.amount();
		});

		// TODO: can linkedSignal contain stateful?
		effect(() => {
			if (this.isMovingBackground() && !this.enabled()) {
				this.enabled.set(true);
			}
		});
	}

	private static get persistType(): BackgroundType {
		return (localStorage.getItem('background.type') ?? BackgroundType.GLASS) as BackgroundType;
	}

	private static set persistType(backgroundType: BackgroundType) {
		localStorage.setItem('background.type', backgroundType);
	}

	private static get persistEnabled(): boolean {
		return JSON.parse(localStorage.getItem('background.enabled') ?? 'true') as boolean;
	}

	private static set persistEnabled(enabled: boolean) {
		localStorage.setItem('background.enabled', String(enabled));
	}

	private static get persistAmount(): number {
		return JSON.parse(localStorage.getItem('background.amount') ?? '5') as number;
	}

	private static set persistAmount(amount: number) {
		localStorage.setItem('background.amount', String(amount));
	}
}
