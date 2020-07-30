import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DyslexicTextService } from './services/dyslexic-text.service';
import { SubSink } from 'subsink';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
	selector: 'dyslexic-text',
	templateUrl: './dyslexic-text.component.html',
	styleUrls: ['./dyslexic-text.component.scss']
})
export class DyslexicTextComponent implements OnInit, OnDestroy {

	subscriptions = new SubSink();

	@Input()
	text: string;

	@Input()
	prefix?: string = '';
	@Input()
	suffix?: string = '';

	defaultWords: string[];
	dyslexicWordCombinations: string[][] = [];

	outputWords: string[];

	constructor(private dyslexicTextService: DyslexicTextService) {
	}

	ngOnInit(): void {
		this.setDefaultWords();
		this.generateDyslexicWords();

		for (let wordIndex = 0; wordIndex < this.defaultWords.length; wordIndex++) {
			this.subscriptions.sink = timer(2000, 1500 + Math.floor(Math.random() * 1000))
				.subscribe(() => this.getNewDyslexicWordByIndex(wordIndex));
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	setDefaultWords(): void {
		this.defaultWords = this.text
			.split(' ')
			.map(searchTerm => searchTerm.trim())
			.filter(searchTerm => searchTerm.length !== 0);

		this.outputWords = [...this.defaultWords];
	}

	generateDyslexicWords(): void {
		this.defaultWords.forEach(word => {
			this.dyslexicWordCombinations.push(this.generateDyslexicWordCombinations(word));
		});
	}

	generateDyslexicWordCombinations(word: string): string[] {
		const dyslexicWordCombinations: string[] = [];

		if (word.length > 3) {
			let orderedLetters: string[] = word.split('');

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

	getNewDyslexicWordByIndex(wordIndex: number): void {
		this.outputWords[wordIndex] = this.dyslexicTextService.getEnabled()
			? this.getNewDyslexicWord(this.defaultWords[wordIndex], this.dyslexicWordCombinations[wordIndex])
			: this.defaultWords[wordIndex];
	}

	getNewDyslexicWord(defaultWord: string, dyslexicWordCombinations: string[]): string {
		const combinationIndex = Math.floor(Math.random() * dyslexicWordCombinations.length * 10);
		return dyslexicWordCombinations[combinationIndex] ?? defaultWord;
	}
}
