import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnekResults } from 'src/app/features/snek/models/state/snek-results.interface';

@Component({
	selector: 'snek-results-dialog',
	templateUrl: './snek-results-dialog.component.html',
	styleUrls: [ './snek-results-dialog.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekResultsDialogComponent {
	public readonly isNewHighScore: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly results: SnekResults,
	) {
		this.isNewHighScore = results.score > results.highScore;
	}
}
