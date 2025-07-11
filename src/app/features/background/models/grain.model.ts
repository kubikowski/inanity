import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

export class Grain extends CanvasElement {
	public override readonly renderInterval = 100;
	public override readonly paintInterval = 100;

	private constructor(
		private readonly canvasWidth: number,
		private readonly canvasHeight: number,
		private readonly grainSpeed: number,
	) {
		super();
	}

	public static reference(): Grain {
		return new Grain(0, 0, 0);
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Grain;
	}

	protected override inBoundaries(): true {
		return true;
	}

	protected override calibrateElements(_canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): readonly this[] {
		const grainSpeed = 0.05 * calibration / maxCalibration;

		return [ new Grain(canvasWidth, canvasHeight, grainSpeed) ] as this[];
	}

	protected override render(): boolean {
		return true;
	}

	protected override shouldClearCanvas(): boolean {
		return false;
	}

	protected override paint(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void {
		const transparentPalette = colorPalette.transparent(0.20);

		for (let y = 0; y < this.canvasHeight; y++) {
			for (let x = 0; x < this.canvasWidth; x++) {
				if (Math.random() > this.grainSpeed) continue;

				const colorKey = BaseColorPalette.getRandomKey();
				context.fillStyle = transparentPalette[colorKey];
				context.clearRect(x, y, 1, 1);
				context.fillRect(x, y, 1, 1);
			}
		}
	}
}
