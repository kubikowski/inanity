import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { BaseDialogComponent } from 'src/app/features/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/features/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/features/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/features/dialogs/models/configuration/dialog-configuration.model';
import { SnekResults } from 'src/app/features/snek/models/state/snek-results.interface';

@Component({
	selector: 'snek-results-dialog',
	templateUrl: 'snek-results-dialog.component.html',
	styleUrl: 'snek-results-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ BaseDialogComponent ],
})
export class SnekResultsDialogComponent extends DialogComponent<SnekResults> {
	public readonly results = this.dialogInput;
	public readonly isNewHighScore = computed(() => this.results.score > this.results.highScore);

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle(this.isNewHighScore() ? 'Congratulations!' : 'woof')
			.withSubmitButtonText(this.isNewHighScore() ? '🤌' : 'woof')
			.withCancelButtonText(this.isNewHighScore() ? '✨' : 'woof')
			.build();
	}
}
