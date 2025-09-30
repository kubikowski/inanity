import { computed, effect, Injectable, signal } from '@angular/core';
import { BackgroundType, BackgroundTypeUtil } from 'src/app/features/background/models/background-type.enum';

@Injectable({ providedIn: 'root' })
export class BackgroundService {

	public static readonly minCalibration = 1;
	public static readonly maxCalibration = 20;

	public readonly type = signal(BackgroundService.persistType);
	public readonly amount = signal(BackgroundService.persistAmount);

	public readonly gradient = computed(() => BackgroundTypeUtil.gradient(this.type()));
	public readonly moving = computed(() => BackgroundTypeUtil.moving(this.type()));

	public constructor() {
		effect(() => {
			BackgroundService.persistType = this.type();
			BackgroundService.persistAmount = this.amount();
		});
	}

	private static get persistType(): BackgroundType {
		return (localStorage.getItem('background.type') ?? BackgroundTypeUtil.default) as BackgroundType;
	}

	private static set persistType(backgroundType: BackgroundType) {
		localStorage.setItem('background.type', backgroundType);
	}

	private static get persistAmount(): number {
		return JSON.parse(localStorage.getItem('background.amount') ?? '5') as number;
	}

	private static set persistAmount(amount: number) {
		localStorage.setItem('background.amount', String(amount));
	}
}
