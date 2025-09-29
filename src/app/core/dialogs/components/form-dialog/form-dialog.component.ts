import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { BaseDialogFooterComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog-footer/base-dialog-footer.component';
import { BaseDialogHeaderComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog-header/base-dialog-header.component';
import { DialogConfiguration } from '../../models/configuration/dialog-configuration.model';

@Component({
	selector: 'form-dialog',
	templateUrl: 'form-dialog.component.html',
	styleUrl: '../base-dialog/base-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [ BaseDialogFooterComponent, BaseDialogHeaderComponent, MatDialogContent ],
})
export class FormDialogComponent {
	public readonly configuration = input.required<DialogConfiguration>();
}
