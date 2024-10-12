import { Component, computed, inject, input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogResolution } from 'src/app/features/dialogs/models/dialog-resolution.enum';
import { DialogFooterButtonConfiguration, DialogFooterConfiguration } from '../../../models/configuration/dialog-configuration.model';
import { BaseDialogFooterButtonComponent } from '../base-dialog-footer-button/base-dialog-footer-button.component';

@Component({
	selector: 'base-dialog-footer',
	templateUrl: './base-dialog-footer.component.html',
	styleUrls: [ './base-dialog-footer.component.scss' ],
	standalone: true,
	imports: [ BaseDialogFooterButtonComponent ],
	host: {
		'[class.has-cancel-button]': 'hasCancelButton()',
		'[class.has-visible-buttons]': 'hasVisibleButtons()',
	},
})
export class BaseDialogFooterComponent {
	public readonly configuration = input.required<DialogFooterConfiguration>();
	private readonly dialogRef = inject(MatDialogRef<unknown>);

	public readonly submitButton = computed(() => BaseDialogFooterComponent.spliceDialogClosure(
		this.configuration().submitButton,
		() => this.dialogRef.close(DialogResolution.SUCCESS)));

	public readonly cancelButton = computed(() => BaseDialogFooterComponent.spliceDialogClosure(
		this.configuration().cancelButton,
		() => this.dialogRef.close(DialogResolution.DISMISS)));

	public readonly hasSubmitButton = computed(() =>
		!this.submitButton().hidden?.());

	public readonly hasCancelButton = computed(() =>
		!this.cancelButton().hidden?.());

	public readonly hasVisibleButtons = computed(() =>
		this.hasSubmitButton() || this.hasCancelButton());


	private static spliceDialogClosure(button: DialogFooterButtonConfiguration, closure: () => void): DialogFooterButtonConfiguration {
		if (typeof button.action === 'undefined') {
			button.action = () => closure();

		} else {
			button.action = <T> () => {
				const result = button.action?.() as Observable<T> | void;

				if (typeof result !== 'undefined') {
					return result.pipe(tap(() => closure()));
				} else {
					return closure();
				}
			};
		}

		return button;
	}
}
