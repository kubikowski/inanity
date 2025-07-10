import { computed, Injectable, signal } from '@angular/core';
import { BackgroundType } from 'src/app/features/background/models/background-type.enum';
import { BackgroundCanvasService } from 'src/app/features/background/services/background-canvas.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';

@Injectable()
export class BackgroundDemoService extends BackgroundCanvasService {
	public override readonly rawCanvasWidth = signal(0);
	public override readonly rawCanvasHeight = signal(0);

	protected override readonly mousePosition = computed<[ number, number ]>(() => [ - this.rawCanvasWidth(), - this.rawCanvasHeight() ]);

	protected override readonly calibration = computed(() => this.backgroundService.amount() / 2);
	protected override readonly maxCalibration = signal(BackgroundService.maxCalibration / 2);

	public override readonly backgroundType = signal(BackgroundType.BUBBLES);
}
