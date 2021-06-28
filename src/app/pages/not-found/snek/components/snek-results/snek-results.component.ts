import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnekResults } from 'src/app/pages/not-found/snek/models/state/snek-results.interface';

@Component({
	selector: 'snek-results',
	templateUrl: './snek-results.component.html',
	styleUrls: [ './snek-results.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekResultsComponent {
	public readonly isNewHighScore: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly results: SnekResults,
	) {
		this.isNewHighScore = results.score > results.highScore;
	}
}