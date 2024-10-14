import { inject, Injectable, OnDestroy } from '@angular/core';
import { DialogConfigBuilder } from 'src/app/features/dialogs/models/configuration/dialog-config-builder.model';
import { DialogService } from 'src/app/features/dialogs/services/dialog.service';
import { SnekResultsDialogComponent } from 'src/app/features/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekResults } from 'src/app/features/snek/models/state/snek-results.interface';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekDialogService implements OnDestroy {
	private readonly dialogService = inject(DialogService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly subscriptions = new SubSink();

	public constructor() {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(gameOverMessage => this.openResultsDialog(gameOverMessage));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private openResultsDialog(gameOverMessage: string): void {
		const { score, highScore } = this.snekStateService;

		const data: SnekResults = {
			score,
			highScore,
			gameOverMessage,
		};

		const dialogRef = this.dialogService.static(
			SnekResultsDialogComponent, DialogConfigBuilder.default(data));

		dialogRef.afterClosed()
			.subscribe(() => this.snekStateService.resetSnekGame());
	}
}
