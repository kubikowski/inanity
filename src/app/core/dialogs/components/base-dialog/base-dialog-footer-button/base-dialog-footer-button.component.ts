import { ChangeDetectionStrategy, Component, input, untracked } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogFooterButtonConfiguration } from '../../../models/configuration/dialog-configuration.model';

@Component({
	selector: 'base-dialog-footer-button',
	templateUrl: 'base-dialog-footer-button.component.html',
	styleUrl: 'base-dialog-footer-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatButton, MatIcon ],
})
export class BaseDialogFooterButtonComponent {
	public readonly configuration = input.required<DialogFooterButtonConfiguration>();

	public doAction(): void {
		untracked(this.configuration).action?.();
	}
}
