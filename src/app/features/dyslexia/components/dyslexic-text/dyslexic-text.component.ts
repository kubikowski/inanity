import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { DyslexicWord } from 'src/app/features/dyslexia/models/dyslexic-word.model';
import { DyslexiaService } from 'src/app/features/dyslexia/services/dyslexia.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'dyslexic-text',
	template: '',
	host: { '[innerHTML]': 'outputText()' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DyslexicTextComponent {
	private readonly dyslexiaService = inject(DyslexiaService);
	private readonly subscriptions = new SubSink();

	public readonly text = input<string>('');

	private readonly splitText = computed(() => this.text().split(/\b/));
	private readonly inputWords = computed(() => this.splitText().filter(text => /\b/.test(text)));
	private readonly delimiters = computed(() => this.splitText().filter(text => !/\b/.test(text)));
	private readonly startsWithWord = computed(() => /\b/.test(this.splitText()[0] ?? ''));

	private readonly outputWords$ = computed(() =>
		combineLatest(this.inputWords().map(inputWord =>
			timer(0, 1500 + Math.floor(Math.random() * 1000))
				.pipe(map(() => this.getDyslexicWord(inputWord))))));

	private readonly outputWords = signal(untracked(this.inputWords));
	public readonly outputText = computed(() =>
		this.getOutputText(this.outputWords(), this.delimiters(), this.startsWithWord()));

	public constructor() {
		effect(() => {
			this.subscriptions.unsubscribe();

			if (this.dyslexiaService.enabled()) {
				this.subscriptions.sink = this.outputWords$()
					.subscribe(outputWords => this.outputWords.set(outputWords));

			} else {
				this.outputWords.set(this.inputWords());
			}
		});
	}

	private getDyslexicWord(word: string): string {
		if (!untracked(this.dyslexiaService.enabled)) {
			return word;
		}

		const combinations = this.getCombinations(word);

		const dyslexiaAmount = clamp(DyslexiaService.minAmount, untracked(this.dyslexiaService.amount), DyslexiaService.maxAmount);
		const combinationIndex = Math.floor(Math.random() * combinations.length * DyslexiaService.maxAmount / dyslexiaAmount);

		return combinations[combinationIndex]
			?? word;
	}

	private getCombinations(word: string): readonly string[] {
		if (!DyslexiaService.wordCombinations.has(word)) {
			const combinations = DyslexicWord.from(word).combinations;

			DyslexiaService.wordCombinations.set(word, combinations);
		}

		return DyslexiaService.wordCombinations.get(word) as readonly string[];
	}

	private getOutputText(outputWords: string[], delimiters: string[], startsWithWord: boolean): string {
		const primaryArray = startsWithWord ? outputWords : delimiters;
		const secondaryArray = startsWithWord ? delimiters : outputWords;

		return primaryArray
			.map((primaryString, index) => primaryString + (secondaryArray[index] ?? ''))
			.join('');
	}
}
