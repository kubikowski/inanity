import { ChangeDetectionStrategy, Component, computed, input, untracked } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogButtonConfiguration } from '../../../models/configuration/dialog-configuration.model';

@Component({
	selector: 'base-dialog-button',
	templateUrl: 'base-dialog-button.component.html',
	styleUrl: 'base-dialog-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ MatButton, MatIcon ],
	host: {
		'[class.hidden]': 'hidden()',
	},
})
export class BaseDialogButtonComponent {
	public readonly configuration = input.required<DialogButtonConfiguration>();

	public readonly hidden = computed(() => !this.configuration().visible());

	public doAction(): void {
		untracked(this.configuration).action?.();
	}
}
