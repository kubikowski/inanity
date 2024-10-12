import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BaseDialogComponent } from 'src/app/features/dialogs/components/base-dialog/base-dialog.component';
import { DialogBuilder } from '../../models/builder/dialog.builder';
import { ConfirmDialogConfiguration } from '../../models/configuration/confirm-dialog-configuration.model';
import { DialogResolution } from '../../models/dialog-resolution.enum';
import { DialogComponent } from '../dialog.component';

@Component({
	selector: 'confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: [ './confirm-dialog.component.scss' ],
	standalone: true,
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
			.withSubmitButtonText(this.configuration?.submitButtonText ?? 'Confirm')
			.withCancelButtonText(this.configuration?.cancelButtonText ?? 'Cancel')
			.withSubmitButtonAction(() => this.onSubmit())
			.withCancelButtonAction(() => this.dialogRef.close(DialogResolution.DISMISS))
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
