import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

export abstract class CanvasSingleton extends CanvasElement {
	protected constructor() {
		super();
	}

	protected override inBoundaries(): true {
		return true;
	}

	protected override calibrateElements(_canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): readonly this[] {
		return [ this.calibrate(canvasWidth, canvasHeight, calibration, maxCalibration) ];
	}

	protected abstract calibrate(canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): this;

	protected override render(): boolean {
		return true;
	}

	protected override shouldClearCanvas(): boolean {
		return false;
	}
}
