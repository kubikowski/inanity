import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';
import { SnekResultsComponent } from 'src/app/pages/not-found/snek/snek-results/snek-results.component';
import { SubSink } from 'subsink';

@Injectable()
export class SnekDialogService {
	private readonly subscriptions = new SubSink();

	constructor(
		private readonly dialog: MatDialog,
		private readonly snekStateService: SnekStateService,
	) {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(() => this.openResultsDialog());
	}

	private openResultsDialog(): void {
		const score = this.snekStateService.score;
		const highScore = this.snekStateService.highScore;

		const dialogRef = this.dialog.open(
			SnekResultsComponent,
			{
				width: '300px',
				data: { score, highScore },
			},
		);

		dialogRef.afterClosed().subscribe(() => {
			this.snekStateService.resetSnekGame();
		});
	}
}
