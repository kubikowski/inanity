import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';

export type PasswordType = 'current' | 'new' | 'confirm';

@Component({
	selector: 'password-input',
	templateUrl: 'password-input.component.html',
	styleUrl: 'password-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatError, MatFormField, MatInput, MatLabel,
		ReactiveFormsModule, MatIcon, MatSuffix, MatIconButton, MatTooltip,
	],
})
export class PasswordInputComponent {
	public readonly passwordControl = input.required<FormControl<string>>();
	public readonly passwordType = input.required<PasswordType>();

	public readonly label = computed(() => {
		switch (this.passwordType()) {
			case 'current':
			case 'new':
				return 'Password';
			case 'confirm':
				return 'Confirm Password';
		}
	});

	public readonly autocomplete = computed(() => {
		switch (this.passwordType()) {
			case 'current':
				return 'current-password';
			case 'new':
			case 'confirm':
				return 'new-password';
		}
	});

	public readonly requiredMessage = computed(() => {
		switch (this.passwordType()) {
			case 'current':
				return 'Please enter your password.';
			case 'new':
				return 'Please enter a password.';
			case 'confirm':
				return 'Please re-enter your password.';
		}
	});

	private readonly visible = signal(false);
	public readonly inputType = computed(() => this.visible() ? 'text' : 'password');
	public readonly visibilityIcon = computed(() => this.visible() ? 'visibility_off' : 'visibility');
	public readonly visibilityTooltip = computed(() => this.visible() ? 'Hide Password' : 'Show Password');

	public toggleVisibility(): void {
		this.visible.set(!this.visible());
	}
}
