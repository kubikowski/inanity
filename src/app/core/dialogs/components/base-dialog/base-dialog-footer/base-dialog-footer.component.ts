import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseDialogButtonComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog-button/base-dialog-button.component';
import { DialogButtonConfiguration, DialogFooterConfiguration } from '../../../models/configuration/dialog-configuration.model';
import { DialogResolution } from '../../../models/dialog-resolution.enum';

@Component({
	selector: 'base-dialog-footer',
	templateUrl: 'base-dialog-footer.component.html',
	styleUrl: 'base-dialog-footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		BaseDialogButtonComponent,
		MatDialogActions,
	],
})
export class BaseDialogFooterComponent {
	public readonly configuration = input.required<DialogFooterConfiguration>();
	private readonly dialogRef = inject(MatDialogRef<unknown>);

	// region button configurations
	public readonly submitButton = computed(() => BaseDialogFooterComponent.spliceDialogClosure(
		this.configuration().submitButton,
		() => this.dialogRef.close(DialogResolution.SUCCESS)));

	public readonly cancelButton = computed(() => BaseDialogFooterComponent.spliceDialogClosure(
		this.configuration().cancelButton,
		() => this.dialogRef.close(DialogResolution.DISMISS)));

	private readonly extraButtons = computed(() => this.configuration().extraButtons);
	public readonly extraButtonsLeft = computed(() => this.extraButtons()
		.filter(button => (button.alignment ?? 'left') === 'left'));
	public readonly extraButtonsRight = computed(() => this.extraButtons()
		.filter(button => button.alignment === 'right'));
	// endregion button configurations


	// region has buttons
	public readonly hasSubmitButton = computed(() =>
		!this.submitButton().hidden?.());

	public readonly hasCancelButton = computed(() =>
		!this.cancelButton().hidden?.());

	public readonly hasExtraButtons = computed(() =>
		this.extraButtons().some(button => !button.hidden?.()));

	public readonly hasVisibleButtons = computed(() =>
		this.hasSubmitButton() || this.hasCancelButton() || this.hasExtraButtons());
	// endregion has buttons


	private static spliceDialogClosure(button: DialogButtonConfiguration, closure: () => void): DialogButtonConfiguration {
		if (typeof button.action === 'undefined') {
			button.action = () => closure();

		} else {
			const existingAction = button.action;
			button.action = <T> () => {
				const result: Observable<T> | void = existingAction?.();

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
