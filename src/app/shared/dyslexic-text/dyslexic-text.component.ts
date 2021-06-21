import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/services/dyslexic-text.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'dyslexic-text',
	templateUrl: './dyslexic-text.component.html',
	styleUrls: [ './dyslexic-text.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DyslexicTextComponent implements OnInit, OnDestroy {
	private readonly subscriptions = new SubSink();

	@Input() text = '';

	private inputWords: string[];
	private inputDelimiters: string[];

	private dyslexicWordCombinations: string[][] = [];

	@Observed() private outputWords: string[] = [];
	private readonly outputWords$: Observable<string[]>;
	public readonly outputText$: Observable<string>;

	constructor(private dyslexicTextService: DyslexicTextService) {
		this.outputText$ = this.outputWords$
			.pipe(
				map(outputWords => outputWords
					.map((outputWord, index) => outputWord + (this.inputDelimiters[index] ?? ''))
					.join('')),
				distinctUntilChanged(),
			);
	}

	ngOnInit(): void {
		this.setDefaultWords();
		this.generateDyslexicWords();

		for (let wordIndex = 0; wordIndex < this.inputWords.length; wordIndex++) {
			this.subscriptions.sink = timer(2000, 1500 + Math.floor(Math.random() * 1000))
				.subscribe(() => this.getNewDyslexicWordByIndex(wordIndex));
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private setDefaultWords(): void {
		const splitText = this.text
			.split(/\b/);

		this.inputWords = splitText
			.filter((ignored, index) => index % 2 === 0);

		this.inputDelimiters = splitText
			.filter((ignored, index) => index % 2 === 1);

		this.outputWords = [ ...this.inputWords ];
	}

	private generateDyslexicWords(): void {
		this.inputWords.forEach(word => {
			this.dyslexicWordCombinations.push(this.generateDyslexicWordCombinations(word));
		});
	}

	private generateDyslexicWordCombinations(word: string): string[] {
		const dyslexicWordCombinations: string[] = [];

		if (word.length > 3) {
			const orderedLetters: string[] = word.split('');

			const firstLetter = orderedLetters.shift();
			const lastLetter = orderedLetters.pop();

			const remainingLetters = orderedLetters.join('');

			// Number of steps to move each letter
			for (let distance = 0; distance < remainingLetters.length - 1; distance++) {

				// Moving Letter Index
				for (let letterIndex = 0; letterIndex < remainingLetters.length - distance - 1; letterIndex++) {
					const startingLetters = remainingLetters.slice(0, letterIndex);
					const forwardLetter = remainingLetters.charAt(letterIndex);
					const backwardLetters = remainingLetters.slice(letterIndex + 1, letterIndex + distance + 2);
					const endingLetters = remainingLetters.slice(letterIndex + distance + 2);

					const result = firstLetter + startingLetters + backwardLetters + forwardLetter + endingLetters + lastLetter;
					dyslexicWordCombinations.push(result);
				}
			}
		}

		return dyslexicWordCombinations;
	}

	private getNewDyslexicWordByIndex(wordIndex: number): void {
		const outputWord = this.dyslexicTextService.isEnabled
			? this.getNewDyslexicWord(this.inputWords[wordIndex], this.dyslexicWordCombinations[wordIndex])
			: this.inputWords[wordIndex];

		this.outputWords = [ ...this.outputWords.slice(0, wordIndex), outputWord, ...this.outputWords.slice(wordIndex + 1) ];
	}

	private getNewDyslexicWord(defaultWord: string, dyslexicWordCombinations: string[]): string {
		const combinationIndex = Math.floor(Math.random() * dyslexicWordCombinations.length * this.dyslexicTextService.amount);
		return dyslexicWordCombinations[combinationIndex] ?? defaultWord;
	}
}
