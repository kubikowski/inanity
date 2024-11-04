import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundService {

	public readonly enabled = signal(BackgroundService.persistEnabled);
	public readonly moving = signal(BackgroundService.persistMoving);
	public readonly amount = signal(BackgroundService.persistAmount);

	public constructor() {
		effect(() => {
			BackgroundService.persistEnabled = this.enabled();
			BackgroundService.persistMoving = this.moving();
			BackgroundService.persistAmount = this.amount();
		});
	}

	private static get persistEnabled(): boolean {
		return JSON.parse(localStorage.getItem('background.enabled') ?? 'true') as boolean;
	}

	private static set persistEnabled(enabled: boolean) {
		localStorage.setItem('background.enabled', String(enabled));
	}

	private static get persistMoving(): boolean {
		return JSON.parse(localStorage.getItem('background.moving') ?? 'true') as boolean;
	}

	private static set persistMoving(moving: boolean) {
		localStorage.setItem('background.moving', String(moving));
	}

	private static get persistAmount(): number {
		return JSON.parse(localStorage.getItem('background.amount') ?? '5') as number;
	}

	private static set persistAmount(amount: number) {
		localStorage.setItem('background.amount', String(amount));
	}
}
