import { Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { delay } from 'rxjs';
import { SlideUpAnimation } from 'src/app/core/animations/slide-up.animation';
import { formatSnekScore } from 'src/app/features/snek/models/state/snek-score.function';

@Component({
	selector: 'snek-score',
	templateUrl: 'snek-score.component.html',
	styleUrl: 'snek-score.component.scss',
	standalone: true,
	imports: [
		MatIcon,
	],
	hostDirectives: [ MatTooltip ],
	animations: [ SlideUpAnimation ],
})
export class SnekScoreComponent {
	private readonly matTooltip = inject(MatTooltip);

	public readonly score = input.required<number>();
	public readonly tooltip = input.required<string>();
	public readonly icon = input.required<string>();

	private readonly currentDigits = computed(() => formatSnekScore(this.score()));
	private readonly previousDigits = toSignal(toObservable(this.currentDigits).pipe(delay(100)));

	public readonly displayedDigits = computed(() => this.getDisplayedDigits());

	public constructor() {
		effect(() => this.updateTooltip());
	}

	private updateTooltip(): void {
		this.matTooltip.message = `${ this.tooltip() }: ${ this.currentDigits() }`;
	}

	private getDisplayedDigits(): (string | null)[] {
		const currentDigits = this.currentDigits()?.split('');
		const previousDigits = this.previousDigits()?.split('');

		if (typeof previousDigits === 'undefined') {
			return currentDigits;
		}

		return currentDigits.map((currentDigit, index) => {
			const previousDigit = previousDigits[index]!;
			return (currentDigit === previousDigit) ? currentDigit : null;
		});
	}
}
