import { computed, Injectable, signal } from '@angular/core';
import { BackgroundType } from 'src/app/features/background/models/background-type.enum';
import { BackgroundCanvasService } from 'src/app/features/background/services/background-canvas.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';

@Injectable()
export class BackgroundDemoService extends BackgroundCanvasService {
	protected override readonly rawCanvasWidth = computed(() => (this.canvas()?.getBoundingClientRect()?.width ?? 0) * 2.5);
	protected override readonly rawCanvasHeight = computed(() => (this.canvas()?.getBoundingClientRect()?.height ?? 0) * 2.5);

	protected override readonly mousePosition = computed<[ number, number ]>(() => [ this.canvasWidth() / 2, this.canvasHeight() / 2 ]);

	protected override readonly calibration = computed(() => this.backgroundService.amount() / 2);
	protected override readonly maxCalibration = signal(BackgroundService.maxCalibration / 2).asReadonly();

	public override readonly backgroundType = signal(BackgroundType.BUBBLES);
}
