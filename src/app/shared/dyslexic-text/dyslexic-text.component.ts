import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/dyslexic-text.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'dyslexic-text',
	template: '{{ outputText$ | async }}',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DyslexicTextComponent implements OnChanges, OnDestroy {
	private readonly subscriptions = new SubSink();

	@Input() text = '';

	private inputWords: string[];
	private delimiters: string[];
	private startsWithWord: boolean;

	@Observed() private outputWords: string[] = [];
	private readonly outputWords$: Observable<string[]>;
	public readonly outputText$: Observable<string>;

	constructor(private dyslexicTextService: DyslexicTextService) {
		this.outputText$ = this.outputWords$
			.pipe(
				map(outputWords => this.getOutputText(outputWords)),
				distinctUntilChanged(),
			);
	}

	ngOnChanges(): void {
		this.subscriptions.unsubscribe();
		this.setDefaultWords();

		for (let wordIndex = 0; wordIndex < this.inputWords.length; wordIndex++) {
			this.subscriptions.sink = timer(2000, 1500 + Math.floor(Math.random() * 1000))
				.subscribe(() => this.setDyslexicWordByIndex(wordIndex));
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private setDefaultWords(): void {
		const splitText = this.text.split(/\b/);

		this.inputWords = splitText.filter((text) => /\b/.test(text));
		this.delimiters = splitText.filter((text) => !/\b/.test(text));
		this.startsWithWord = /\b/.test(splitText[0]);

		this.outputWords = [ ...this.inputWords ];
	}

	private setDyslexicWordByIndex(wordIndex: number): void {
		const inputWord = this.inputWords[wordIndex];
		const outputWord = this.dyslexicTextService.getDyslexicWord(inputWord);

		this.outputWords = [
			...this.outputWords.slice(0, wordIndex),
			outputWord,
			...this.outputWords.slice(wordIndex + 1),
		];
	}

	private getOutputText(outputWords: string[]): string {
		const primaryArray = this.startsWithWord ? outputWords : this.delimiters;
		const secondaryArray = this.startsWithWord ? this.delimiters : outputWords;

		return primaryArray
			.map((primaryString, index) => primaryString + (secondaryArray[index] ?? ''))
			.join('');
	}
}
