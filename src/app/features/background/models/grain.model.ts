import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { shuffle } from 'src/app/core/functions/random/shuffle.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { CanvasSingleton } from 'src/app/features/background/models/canvas-singleton.model';

export class Grain extends CanvasSingleton {
	public override readonly renderInterval = 40;
	public override readonly paintInterval = 40;

	private constructor(
		private readonly canvasWidth: number,
		private readonly canvasHeight: number,
		private readonly grainRate: number,
		private readonly grainOffsetSize: number,
		private readonly grainOffsets: [ number, number ][],
		private grainIndex = 0,
	) {
		super();
	}

	public static reference(): Grain {
		return new Grain(0, 0, 0, 0, []);
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Grain;
	}

	protected override calibrate(canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): this {
		const grainOffsetSize = Math.floor(maxCalibration / 2);
		const grainOffsets = this.getGrainOffsets(grainOffsetSize);
		const grainRate = 0.01 * grainOffsetSize * calibration / maxCalibration;

		return new Grain(canvasWidth, canvasHeight, grainRate, grainOffsetSize, grainOffsets) as this;
	}

	private getGrainOffsets(grainOffsetSize: number): [ number, number ][] {
		const grainOffsets = Array
			.from({ length: grainOffsetSize })
			.map(((_ignoredRow, y) => Array
				.from({ length: grainOffsetSize })
				.map((_ignoredColumn, x) => [ x, y ] as [ number, number ])))
			.flat();

		return shuffle(grainOffsets);
	}

	protected override getFillPalette(colorPalette: ColorPalette): ColorPalette {
		return colorPalette.transparent(0.35);
	}

	protected override paint(context: CanvasRenderingContext2D, fillPalette: ColorPalette): void {
		const [ rows, columns ] = this.getOffsetGrid();

		for (const y of rows) {
			for (const x of columns) {
				if (Math.random() > this.grainRate) continue;

				const colorKey = BaseColorPalette.getRandomKey();
				context.fillStyle = fillPalette[colorKey];
				context.clearRect(x, y, 1, 1);
				context.fillRect(x, y, 1, 1);
			}
		}
	}

	private getOffsetGrid(): [ number[], number[] ] {
		const [ xOffset, yOffset ] = this.getGrainOffset();

		const maxRows = Math.ceil((this.canvasHeight - yOffset) / this.grainOffsetSize);
		const maxColumns = Math.ceil((this.canvasWidth - xOffset) / this.grainOffsetSize);

		const rows = Array.from({ length: maxRows })
			.map((_ignored, index) => index * this.grainOffsetSize + yOffset);
		const columns = Array.from({ length: maxColumns })
			.map((_ignored, index) => index * this.grainOffsetSize + xOffset);

		return [ rows, columns ];
	}

	private getGrainOffset(): [ number, number ] {
		const grainOffset = this.grainOffsets.at(this.grainIndex) ?? null;

		if (grainOffset !== null) {
			this.grainIndex++;
			return grainOffset;
		} else if (this.grainIndex !== 0) {
			this.grainIndex = 0;
			return this.getGrainOffset();
		} else {
			throw new Error('Grain offsets are empty.');
		}
	}
}
