import { ChangeDetectionStrategy, Component, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { formValue } from 'src/app/core/functions/rxjs/form-value.function';
import { BaseDialogComponent } from 'src/app/features/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/features/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/features/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/features/dialogs/models/configuration/dialog-configuration.model';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { DyslexicTextService } from 'src/app/features/dyslexia/services/dyslexic-text.service';

@Component({
	selector: 'dyslexia-dialog',
	templateUrl: './dyslexia-dialog.component.html',
	styleUrl: './dyslexia-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatCheckbox, MatSlider, MatSliderThumb, ReactiveFormsModule,
		BaseDialogComponent, DyslexicTextComponent,
	],
})
export class DyslexiaDialogComponent extends DialogComponent {
	private readonly dyslexicTextService = inject(DyslexicTextService);

	public readonly minAmount = DyslexicTextService.minAmount;
	public readonly maxAmount = DyslexicTextService.maxAmount;

	public readonly enabledControl = new FormControl(this.dyslexicTextService.isEnabled, { nonNullable: true });
	public readonly enabled = toSignal(formValue(this.enabledControl));

	public readonly amountControl = new FormControl(this.dyslexicTextService.amount, { nonNullable: true });
	public readonly amount = toSignal(this.amountControl.valueChanges);

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Dyslexia')
			.withSubmitButtonHidden()
			.withCancelButtonHidden()
			.build();
	}

	public toggleMovingBackgroundEnabled(): void {
		const enabled = untracked(this.enabled);

		if (typeof enabled !== 'undefined') {
			this.dyslexicTextService.isEnabled = enabled;
		}
	}

	public setMovingBackgroundAmount(): void {
		const amount = untracked(this.amount);

		if (typeof amount !== 'undefined') {
			this.dyslexicTextService.amount = amount;
		}
	}
}
