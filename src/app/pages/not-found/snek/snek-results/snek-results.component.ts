import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-snek-results',
	templateUrl: './snek-results.component.html',
	styleUrls: [ './snek-results.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekResultsComponent {
	public readonly newHighScore: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public results: { score: number, highScore: number },
	) {
		this.newHighScore = results.score > results.highScore;
	}
}
