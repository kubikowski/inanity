import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfiguration } from 'src/app/features/dialogs/models/configuration/confirm-dialog-configuration.model';
import { DialogConfigBuilder } from 'src/app/features/dialogs/models/configuration/dialog-config-builder.model';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DialogResolution } from '../models/dialog-resolution.enum';

@Injectable({ providedIn: 'root' })
export class DialogService {
	private readonly matDialog = inject(MatDialog);

	/**
	 * Opens a basic dialog with no form support.
	 * @param component - the component class that should be rendered inside the dialog.
	 * @param config - the dialog configuration
	 * @returns a reference to the dialog {@link MatDialogRef}
	 */
	public static<R = DialogResolution, D = unknown, T = unknown>(
		component: ComponentType<T>,
		config: DialogConfigBuilder<D> = DialogConfigBuilder.default(),
	): MatDialogRef<T, R> {
		return this.matDialog.open(component, config.build());
	}

	public confirm<R = DialogResolution>(confirmDialogConfiguration: ConfirmDialogConfiguration): MatDialogRef<ConfirmDialogComponent, R> {
		return this.static<R, ConfirmDialogConfiguration, ConfirmDialogComponent>(
			ConfirmDialogComponent,
			DialogConfigBuilder.default(confirmDialogConfiguration),
		);
	}
}
