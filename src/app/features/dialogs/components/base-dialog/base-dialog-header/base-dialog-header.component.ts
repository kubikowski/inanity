import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogHeaderConfiguration } from '../../../models/configuration/dialog-configuration.model';

@Component({
	selector: 'base-dialog-header',
	templateUrl: './base-dialog-header.component.html',
	styleUrls: [ './base-dialog-header.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatIcon, MatTooltip ],
})
export class BaseDialogHeaderComponent {
	public readonly configuration = input.required<DialogHeaderConfiguration>();
}
