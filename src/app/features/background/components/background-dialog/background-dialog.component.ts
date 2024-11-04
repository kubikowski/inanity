import { ChangeDetectionStrategy, Component, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { formValue } from 'src/app/core/functions/rxjs/form-value.function';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'background-dialog',
	templateUrl: 'background-dialog.component.html',
	styleUrl: 'background-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatCheckbox, MatSlider, MatSliderThumb, ReactiveFormsModule,
		BaseDialogComponent, DyslexicTextComponent,
	],
})
export class BackgroundDialogComponent extends DialogComponent {
	private readonly backgroundService = inject(BackgroundService);

	public readonly enabledControl = new FormControl(untracked(this.backgroundService.enabled), { nonNullable: true });
	public readonly enabled = toSignal(formValue(this.enabledControl));

	public readonly movingControl = new FormControl(untracked(this.backgroundService.moving), { nonNullable: true });
	public readonly moving = toSignal(formValue(this.movingControl));

	public readonly amountControl = new FormControl(untracked(this.backgroundService.amount), { nonNullable: true });
	public readonly amount = toSignal(this.amountControl.valueChanges);

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Background')
			.withSubmitButtonHidden()
			.withCancelButtonHidden()
			.build();
	}

	public toggleBackgroundEnabled(): void {
		const enabled = untracked(this.enabled);

		if (typeof enabled !== 'undefined') {
			this.backgroundService.enabled.set(enabled);
		}
	}

	public toggleBackgroundMoving(): void {
		const enabled = untracked(this.enabled);
		const moving = untracked(this.moving);

		if (typeof enabled !== 'undefined' && typeof moving !== 'undefined') {
			this.backgroundService.enabled.set(enabled || moving);
			this.backgroundService.moving.set(moving);
		}
	}

	public setMovingBackgroundAmount(): void {
		const amount = untracked(this.amount);

		if (typeof amount !== 'undefined') {
			this.backgroundService.amount.set(amount);
		}
	}
}
