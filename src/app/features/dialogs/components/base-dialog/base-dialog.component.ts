import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { DialogConfiguration } from '../../models/configuration/dialog-configuration.model';
import { BaseDialogFooterComponent } from './base-dialog-footer/base-dialog-footer.component';
import { BaseDialogHeaderComponent } from './base-dialog-header/base-dialog-header.component';

@Component({
	selector: 'base-dialog',
	templateUrl: 'base-dialog.component.html',
	styleUrl: 'base-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		BaseDialogFooterComponent,
		BaseDialogHeaderComponent,
	],
})
export class BaseDialogComponent {
	public readonly configuration = input.required<DialogConfiguration>();
}
