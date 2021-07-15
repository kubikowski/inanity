import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { DyslexicWord } from 'src/app/shared/dyslexic-text/models/dyslexic-word.model';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	@Observed() public isEnabled: boolean;
	@Observed() public amount: number;

	public readonly isEnabled$: Observable<boolean>;
	public readonly amount$: Observable<number>;

	private readonly wordCombinations = new Map<string, readonly string[]>();

	constructor() {
		this.isEnabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;
		this.amount = JSON.parse(localStorage.getItem('dyslexia-amount')) ?? 15;

		this.persistSettings();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private persistSettings(): void {
		this.subscriptions.sink = this.isEnabled$
			.subscribe(isEnabled => localStorage.setItem('dyslexic-text', String(isEnabled)));

		this.subscriptions.sink = this.amount$
			.subscribe(amount => localStorage.setItem('dyslexia-amount', String(amount)));
	}

	public getDyslexicWord(word: string): string {
		if (!this.isEnabled) {
			return word;
		}

		const combinations = this.getCombinations(word);
		const combinationIndex = Math.floor(Math.random() * combinations.length * this.amount);

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
