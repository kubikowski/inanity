import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService {

	public static readonly minAmount = 0;
	public static readonly maxAmount = 100;
	public static readonly wordCombinations = new Map<string, readonly string[]>();

	public readonly enabled = signal(DyslexicTextService.persistEnabled);
	public readonly amount = signal(DyslexicTextService.persistAmount);

	public constructor() {
		effect(() => {
			DyslexicTextService.persistEnabled = this.enabled();
			DyslexicTextService.persistAmount = this.amount();
		});
	}

	private static get persistEnabled(): boolean {
		return JSON.parse(localStorage.getItem('dyslexic-text') ?? 'true') as boolean;
	}

	private static set persistEnabled(enabled: boolean) {
		localStorage.setItem('dyslexic-text', String(enabled));
	}

	private static get persistAmount(): number {
		return JSON.parse(localStorage.getItem('dyslexia-amount') ?? '5') as number;
	}

	private static set persistAmount(amount: number) {
		localStorage.setItem('dyslexia-amount', String(amount));
	}
}
