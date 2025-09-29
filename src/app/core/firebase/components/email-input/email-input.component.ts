import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';

@Component({
	selector: 'email-input',
	templateUrl: 'email-input.component.html',
	styleUrl: 'email-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatError, MatFormField, MatInput, MatLabel,
		ReactiveFormsModule,
	],
})
export class EmailInputComponent {
	public readonly emailControl = input.required<FormControl<string>>();
}
