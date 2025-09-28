import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';

@Component({
	selector: 'password-input',
	templateUrl: 'password-input.component.html',
	styleUrl: 'password-input.component.scss',
	imports: [
		MatError, MatFormField, MatInput, MatLabel,
		ReactiveFormsModule,
	],
})
export class PasswordInputComponent {
	public readonly passwordControl = input.required<FormControl<string>>();
}
