import { effect, inject, Injectable, untracked } from '@angular/core';
import { DialogConfigBuilder } from 'src/app/core/dialogs/models/configuration/dialog-config-builder.model';
import { DialogService } from 'src/app/core/dialogs/services/dialog.service';
import { SnekResultsDialogComponent } from 'src/app/features/snek/components/dialog/snek-results-dialog/snek-results-dialog.component';
import { SnekResults } from 'src/app/features/snek/models/report/snek-results.interface';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekDialogService {
	private readonly dialogService = inject(DialogService);
	private readonly snekStateService = inject(SnekStateService);

	public constructor() {
		effect(() => {
			const gameOverMessage = this.snekStateService.gameOver();

			if (gameOverMessage !== null) {
				this.openResultsDialog(gameOverMessage);
			}
		});
	}

	private openResultsDialog(gameOverMessage: string): void {
		const data: SnekResults = {
			score: untracked(this.snekStateService.score),
			highScore: untracked(this.snekStateService.highScore),
			gameOverMessage,
		};

		const dialogConfig = DialogConfigBuilder.default(data)
			.withoutAutoFocus();

		const dialogRef = this.dialogService.static(
			SnekResultsDialogComponent, dialogConfig);

		dialogRef.afterClosed()
			.subscribe(() => this.snekStateService.resetSnekGame());
	}
}
