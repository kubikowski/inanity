import { ChangeDetectionStrategy, Component, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { BackgroundDemoComponent } from 'src/app/features/background/components/background-demo/background-demo.component';
import { BackgroundType } from 'src/app/features/background/models/background-type.enum';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';

@Component({
	selector: 'background-dialog',
	templateUrl: 'background-dialog.component.html',
	styleUrl: 'background-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatDivider, MatSlider, MatSliderThumb, ReactiveFormsModule,
		BaseDialogComponent, DyslexicTextComponent, BackgroundDemoComponent,
	],
})
export class BackgroundDialogComponent extends DialogComponent {
	private readonly backgroundService = inject(BackgroundService);

	public readonly BackgroundType = BackgroundType;
	public readonly min = BackgroundService.minCalibration;
	public readonly max = BackgroundService.maxCalibration;

	public readonly gradient = this.backgroundService.gradient;
	public readonly moving = this.backgroundService.moving;

	public readonly amountControl = new FormControl(untracked(this.backgroundService.amount), { nonNullable: true });
	public readonly amount = toSignal(this.amountControl.valueChanges);

	public constructor() {
		super();
	}

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Background')
			.withSubmitVisible(false)
			.withCancelVisible(false)
			.build();
	}

	public setMovingBackgroundAmount(): void {
		const amount = untracked(this.amount);

		if (typeof amount !== 'undefined') {
			this.backgroundService.amount.set(amount);
		}
	}
}
