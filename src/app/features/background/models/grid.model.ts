import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { CanvasSingleton } from 'src/app/features/background/models/canvas-singleton.model';

export class Grid extends CanvasSingleton {
	public override readonly renderInterval = 32;
	public override readonly paintInterval = 32;

	private static readonly lineWidth = 3;

	private constructor(
		private readonly canvasWidth: number,
		private readonly canvasHeight: number,
		private readonly gridOffset: number,
		private gridOffsetIndex = 0,
	) {
		super();
	}

	public static reference(): Grid {
		return new Grid(0, 0, 0);
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Grid;
	}

	protected override calibrate(canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): this {
		const logCalibration = Math.pow(Math.log2(calibration * maxCalibration), 2);
		const gridOffset = Math.floor(100 * maxCalibration / logCalibration);

		return new Grid(canvasWidth, canvasHeight, gridOffset) as this;
	}

	protected override getFillPalette(colorPalette: ColorPalette): ColorPalette {
		return colorPalette.transparent(0.10);
	}

	protected override paint(context: CanvasRenderingContext2D, fillPalette: ColorPalette): void {
		const offsetIndex = this.getGridOffsetIndex();

		context.globalCompositeOperation = 'destination-out';
		context.fillStyle = 'rgba(255, 255, 255, 0.25)';
		context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

		context.globalCompositeOperation = 'source-over';
		context.fillStyle = fillPalette.colorDefault;

		for (let y = offsetIndex; y < this.canvasHeight; y += this.gridOffset) {
			context.fillRect(0, y, this.canvasWidth, Grid.lineWidth);
		}

		for (let x = offsetIndex; x < this.canvasWidth; x += this.gridOffset) {
			context.fillRect(x, 0, Grid.lineWidth, this.canvasHeight);
		}
	}

	private getGridOffsetIndex(): number {
		const offsetIndex = this.gridOffsetIndex;

		if (this.gridOffsetIndex++ > this.gridOffset) {
			this.gridOffsetIndex = 0;
		}

		return offsetIndex;
	}
}
