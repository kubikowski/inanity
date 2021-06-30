import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnekResultsDialogComponent } from 'src/app/pages/not-found/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekResults } from 'src/app/pages/not-found/snek/models/state/snek-results.interface';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekDialogService {
	private readonly subscriptions = new SubSink();

	constructor(
		private readonly dialog: MatDialog,
		private readonly snekStateService: SnekStateService,
	) {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(gameOverMessage => this.openResultsDialog(gameOverMessage));
	}

	private openResultsDialog(gameOverMessage: string): void {
		const { score, highScore } = this.snekStateService;

		const data: SnekResults = {
			score,
			highScore,
			gameOverMessage,
		};

		const dialogRef = this.dialog.open(
			SnekResultsDialogComponent,
			{ width: '300px', data },
		);

		dialogRef.afterClosed().subscribe(() => {
			this.snekStateService.resetSnekGame();
		});
	}
}
