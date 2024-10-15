import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovingBackgroundService {

	public readonly enabled = signal(MovingBackgroundService.persistEnabled);
	public readonly amount = signal(MovingBackgroundService.persistAmount);

	public constructor() {
		effect(() => {
			MovingBackgroundService.persistEnabled = this.enabled();
			MovingBackgroundService.persistAmount = this.amount();
		});
	}

	private static get persistEnabled(): boolean {
		return JSON.parse(localStorage.getItem('moving-background') ?? 'true') as boolean;
	}

	private static set persistEnabled(enabled: boolean) {
		localStorage.setItem('moving-background', String(enabled));
	}

	private static get persistAmount(): number {
		return JSON.parse(localStorage.getItem('moving-background-amount') ?? '5') as number;
	}

	private static set persistAmount(amount: number) {
		localStorage.setItem('moving-background-amount', String(amount));
	}
}
