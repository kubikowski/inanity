import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialogBuilder } from '../../models/builder/dialog.builder';
import { ConfirmDialogConfiguration } from '../../models/configuration/confirm-dialog-configuration.model';
import { DialogResolution } from '../../models/dialog-resolution.enum';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DialogComponent } from '../dialog.component';

@Component({
	selector: 'confirm-dialog',
	templateUrl: 'confirm-dialog.component.html',
	styleUrl: 'confirm-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [ MatProgressSpinner, BaseDialogComponent ],
})
export class ConfirmDialogComponent extends DialogComponent<ConfirmDialogConfiguration> {

	public readonly configuration = this.dialogInput;
	public readonly loadingMessage = this.configuration.loadingMessage || 'Loading...';

	public readonly actionInProgress = signal(false);

	public initializeDialogConfiguration() {
		return DialogBuilder.new()
			.withHeaderTitle(this.configuration.title)
			.withSubmitText(this.configuration?.submitButtonText ?? 'Confirm')
			.withCancelText(this.configuration?.cancelButtonText ?? 'Cancel')
			.withSubmitAction(() => this.onSubmit())
			.withCancelAction(() => this.dialogRef.close(DialogResolution.DISMISS))
			.build();
	}

	private onSubmit(): void {
		const actionComplete = this.configuration.action();
		this.actionInProgress.set(true);

		actionComplete.subscribe({
			next: result => {
				this.dialogRef.close(result ?? DialogResolution.SUCCESS);
			},
			error: err => {
				this.dialogRef.close(DialogResolution.FAILED);
				console.error(err);
			},
		});
	}
}
