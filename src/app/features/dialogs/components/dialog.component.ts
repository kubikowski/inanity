import { computed, Directive, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfiguration } from '../models/configuration/dialog-configuration.model';

@Directive()
export abstract class DialogComponent<DialogInput = void> {
	protected readonly dialogInput = inject<DialogInput>(MAT_DIALOG_DATA);
	protected readonly dialogRef = inject(MatDialogRef<unknown>);

	public readonly dialogConfiguration = computed(() => this.initializeDialogConfiguration());
	public abstract initializeDialogConfiguration(): DialogConfiguration;
}
