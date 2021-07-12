import { Injectable } from '@angular/core';
import { DyslexicWord } from 'src/app/shared/dyslexic-text/models/dyslexic-word.model';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService {

	private _isEnabled: boolean;
	private _amount: number;

	private readonly wordCombinations = new Map<string, readonly string[]>();

	constructor() {
		const isEnabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;
		const amount = JSON.parse(localStorage.getItem('dyslexia-amount')) ?? 15;

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

	public getDyslexicWord(word: string): string {
		if (!this._isEnabled) {
			return word;
		}

		const combinations = this.getCombinations(word);
		const combinationIndex = Math.floor(Math.random() * combinations.length * this._amount);

		return combinations[combinationIndex]
			?? word;
	}

	private getCombinations(word: string): readonly string[] {
		if (!this.wordCombinations.has(word)) {
			const combinations = DyslexicTextService.generateCombinations(word);

			this.wordCombinations.set(word, combinations);
		}

		return this.wordCombinations.get(word);
	}

	private static generateCombinations(word: string): readonly string[] {
		const dyslexicWord = DyslexicWord.from(word);

		return dyslexicWord.combinations;
	}
}
