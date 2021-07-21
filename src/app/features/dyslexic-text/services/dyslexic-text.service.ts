import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'src/app/core/decorators/observed.decorator';
import { clamp } from 'src/app/core/functions/clamp/clamp.function';
import { DyslexicWord } from 'src/app/features/dyslexic-text/models/dyslexic-word.model';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class DyslexicTextService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	public static readonly minAmount = 0;
	public static readonly maxAmount = 100;

	@Observed() public isEnabled: boolean;
	@Observed() public amount: number;

	public readonly isEnabled$: Observable<boolean>;
	public readonly amount$: Observable<number>;

	private readonly wordCombinations = new Map<string, readonly string[]>();

	constructor() {
		this.isEnabled = JSON.parse(localStorage.getItem('dyslexic-text')) ?? true;
		this.amount = JSON.parse(localStorage.getItem('dyslexia-amount')) ?? 25;

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

		const dyslexiaAmount = clamp(DyslexicTextService.minAmount, this.amount, DyslexicTextService.maxAmount);
		const combinationIndex = Math.floor(Math.random() * combinations.length * DyslexicTextService.maxAmount / dyslexiaAmount);

		return combinations[combinationIndex]
			?? word;
	}

	private getCombinations(word: string): readonly string[] {
		if (!this.wordCombinations.has(word)) {
			const combinations = DyslexicWord.from(word).combinations;

			this.wordCombinations.set(word, combinations);
		}

		return this.wordCombinations.get(word);
	}
}
