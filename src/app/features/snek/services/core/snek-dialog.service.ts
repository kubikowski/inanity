import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnekResultsDialogComponent } from 'src/app/features/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekResults } from 'src/app/features/snek/models/state/snek-results.interface';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekDialogService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	constructor(
		private readonly dialog: MatDialog,
		private readonly snekStateService: SnekStateService,
	) {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(gameOverMessage => this.openResultsDialog(gameOverMessage));
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
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

		dialogRef.afterClosed()
			.subscribe(() => this.snekStateService.resetSnekGame());
	}
}
