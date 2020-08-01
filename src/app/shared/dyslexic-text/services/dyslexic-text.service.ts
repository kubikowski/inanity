import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService {

	private enabled: boolean;
	private amount: number;

	constructor() {
		// Get Initial Values
		const enabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;
		const amount = JSON.parse(localStorage.getItem('dyslexia-amount')) ?? 10;

		// Initialize Values
		this.setEnabled(enabled);
		this.setAmount(amount);
	}

	getEnabled(): boolean {
		return this.enabled;
	}

	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
		localStorage.setItem('dyslexic-text', String(enabled));
	}

	getAmount(): number {
		return this.amount;
	}

	setAmount(amount: number): void {
		this.amount = amount;
		localStorage.setItem('dyslexia-amount', String(amount));
	}
}
