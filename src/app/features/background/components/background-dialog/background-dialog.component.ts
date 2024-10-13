import { ChangeDetectionStrategy, Component, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { formValue } from 'src/app/core/functions/rxjs/form-value.function';
import { MovingBackgroundService } from 'src/app/features/background/services/moving-background.service';
import { BaseDialogComponent } from 'src/app/features/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/features/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/features/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/features/dialogs/models/configuration/dialog-configuration.model';

@Component({
	selector: 'background-dialog',
	templateUrl: 'background-dialog.component.html',
	styleUrl: 'background-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatCheckbox, MatSlider, MatSliderThumb, ReactiveFormsModule,
		BaseDialogComponent,
	],
})
export class BackgroundDialogComponent extends DialogComponent {
	private readonly movingBackgroundService = inject(MovingBackgroundService);

	public readonly enabledControl = new FormControl(this.movingBackgroundService.isEnabled, { nonNullable: true });
	public readonly enabled = toSignal(formValue(this.enabledControl));

	public readonly amountControl = new FormControl(this.movingBackgroundService.amount, { nonNullable: true });
	public readonly amount = toSignal(this.amountControl.valueChanges);

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Background')
			.withSubmitButtonHidden()
			.withCancelButtonHidden()
			.build();
	}

	public toggleMovingBackgroundEnabled(): void {
		const enabled = untracked(this.enabled);

		if (typeof enabled !== 'undefined') {
			this.movingBackgroundService.isEnabled = enabled;
		}
	}

	public setMovingBackgroundAmount(): void {
		const amount = untracked(this.amount);

		if (typeof amount !== 'undefined') {
			this.movingBackgroundService.amount = amount;
		}
	}
}
