import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService {

	private _isEnabled: boolean;
	private _amount: number;

	private readonly wordCombinations = new Map<string, readonly string[]>();

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
		const combinations: string[] = [];

		if (word.length > 3) {
			const orderedLetters: string[] = word.split('');

			const firstLetter = orderedLetters.shift();
			const lastLetter = orderedLetters.pop();
			const middleLetters = orderedLetters.join('');

			// Number of steps to move each letter
			for (let distance = 0; distance < middleLetters.length - 1; distance++) {

				// Moving Letter Index
				for (let letterIndex = 0; letterIndex < middleLetters.length - distance - 1; letterIndex++) {
					const startingLetters = middleLetters.slice(0, letterIndex);
					const forwardLetter = middleLetters.charAt(letterIndex);
					const backwardLetters = middleLetters.slice(letterIndex + 1, letterIndex + distance + 2);
					const endingLetters = middleLetters.slice(letterIndex + distance + 2);

					const result = firstLetter + startingLetters + backwardLetters + forwardLetter + endingLetters + lastLetter;
					combinations.push(result);
				}
			}
		}

		return combinations;
	}
}
