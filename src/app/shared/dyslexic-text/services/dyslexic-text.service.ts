import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService {

	private _isEnabled: boolean;
	private _amount: number;

	constructor() {
		const isEnabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;
		const amount = JSON.parse(localStorage.getItem('dyslexia-amount')) ?? 10;

		this.isEnabled = isEnabled;
		this.amount = amount;
	}

	public get isEnabled(): boolean {
		return this._isEnabled;
	}

	public set isEnabled(isEnabled: boolean) {
		this._isEnabled = isEnabled;
		localStorage.setItem('dyslexic-text', String(isEnabled));
	}

	public get amount(): number {
		return this._amount;
	}

	public set amount(amount: number) {
		this._amount = amount;
		localStorage.setItem('dyslexia-amount', String(amount));
	}
}
