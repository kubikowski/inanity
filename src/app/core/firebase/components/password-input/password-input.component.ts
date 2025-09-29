import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';

@Component({
	selector: 'password-input',
	templateUrl: 'password-input.component.html',
	styleUrl: 'password-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatError, MatFormField, MatInput, MatLabel,
		ReactiveFormsModule, MatIcon, MatSuffix, MatIconButton,
	],
})
export class PasswordInputComponent {
	public readonly passwordControl = input.required<FormControl<string>>();

	private readonly visible = signal(false);

	public readonly inputType = computed(() => this.visible() ? 'text' : 'password');
	public readonly visibility = computed(() => this.visible() ? 'visibility' : 'visibility_off');

	public toggleVisibility(): void {
		this.visible.set(!this.visible());
	}
}
