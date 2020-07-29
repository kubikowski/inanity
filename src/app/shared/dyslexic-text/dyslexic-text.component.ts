import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
	defaultText: string;
	outputText: string;

	@Input()
	prefix?: string = '';
	@Input()
	suffix?: string = '';

	defaultWords: string[];
	dyslexicWordCombinations: string[][] = [];

	constructor() {
	}

	ngOnInit(): void {
		this.setDefaultWords();
		this.generateDyslexicWords();

		this.subscriptions.sink = timer(0, 2000)
			.subscribe(() => this.getNewDyslexicText());
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	setDefaultWords(): void {
		this.defaultWords = this.defaultText
			.split(' ')
			.map(searchTerm => searchTerm.trim())
			.filter(searchTerm => searchTerm.length !== 0);
	}

	generateDyslexicWords(): void {
		this.setDefaultWords();

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
			for (let i = 0; i < remainingLetters.length - 1; i++) {

				// Moving Letter Index
				for (let j = 0; j < remainingLetters.length - i - 1; j++) {
					const startingChars = remainingLetters.slice(0, j);
					const forwardChar = remainingLetters.charAt(j);
					const backwardChars = remainingLetters.slice(j + 1, j + i + 2);
					const endingChars = remainingLetters.slice(j + i + 2);

					const result = firstLetter + startingChars + backwardChars + forwardChar + endingChars + lastLetter;
					dyslexicWordCombinations.push(result);
				}
			}
		}

		return dyslexicWordCombinations;
	}

	getNewDyslexicText(): void {
		const selectedWords = [];

		for (let i = 0; i < this.defaultWords.length; i++) {
			selectedWords.push(this.getNewDyslexicWord(this.defaultWords[i], this.dyslexicWordCombinations[i]));
		}

		this.outputText = selectedWords.join(' ');
	}

	getNewDyslexicWord(defaultWord: string, dyslexicWordCombinations: string[]): string {
		let odds = Math.floor(Math.random() * 60);
		for (const dyslexicWordCombination of dyslexicWordCombinations) {
			if (odds === 0) {
				return dyslexicWordCombination;
			}
			odds--;
		}
		return defaultWord;
	}
}
