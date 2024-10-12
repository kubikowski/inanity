import { Component, input } from '@angular/core';
import { DialogConfiguration } from '../../models/configuration/dialog-configuration.model';
import { BaseDialogFooterComponent } from './base-dialog-footer/base-dialog-footer.component';
import { BaseDialogHeaderComponent } from './base-dialog-header/base-dialog-header.component';

@Component({
	selector: 'base-dialog',
	templateUrl: './base-dialog.component.html',
	styleUrls: [ './base-dialog.component.scss' ],
	standalone: true,
	imports: [
		BaseDialogFooterComponent,
		BaseDialogHeaderComponent,
	],
})
export class BaseDialogComponent {
	public readonly configuration = input.required<DialogConfiguration>();
}
