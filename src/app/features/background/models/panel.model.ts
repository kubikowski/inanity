import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { Color } from 'src/app/core/colors/models/color.model';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { CanvasElement, ColorKey } from 'src/app/features/background/models/canvas-element.model';

class PanelCorners extends Array {
	public static enabledCornerOptions = [
		[ 0, 0, 0, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 0, 1, 0 ],
		[ 1, 1, 1, 1 ],
	] as const;

	public static getRandomCorners(pixelSize: number): PanelCorners {
		const enabledCorners = this.enabledCornerOptions.at(Math.floor(Math.random() * 4))!;

		return enabledCorners.map(enabled => Math.floor((enabled + 1) * (pixelSize / 8)));
	}
}

export class Panel extends CanvasElement {
	private static readonly maxPixelSize = 48;
	private static readonly minPixelSize = 8;

	public override readonly renderInterval = 20;
	public override readonly paintInterval = 100;

	private readonly clearRectArguments: [ x: number, y: number, w: number, h: number ];
	private readonly roundRectArguments: [ x: number, y: number, w: number, h: number, radii: PanelCorners ];

	private constructor(
		private x: number,
		private y: number,
		private pixelSize: number,
		private colorKey: ColorKey,
		private corners: PanelCorners,
	) {
		super();

		this.clearRectArguments = [
			this.x * this.pixelSize,
			this.y * this.pixelSize,
			this.pixelSize,
			this.pixelSize,
		];

		this.roundRectArguments = [
			(this.x + 1 / 6) * this.pixelSize,
			(this.y + 1 / 6) * this.pixelSize,
			this.pixelSize * 2 / 3,
			this.pixelSize * 2 / 3,
			this.corners,
		];
	}

	public static reference(): Panel {
		return new Panel(0, 0, 0, Panel.getRandomColorKey(), PanelCorners.getRandomCorners(0));
	}

	public static random(x: number, y: number, pixelSize: number): Panel {
		return new Panel(x, y, pixelSize, Panel.getRandomColorKey(), PanelCorners.getRandomCorners(pixelSize));
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Panel;
	}

	protected override inBoundaries(canvasWidth: number, canvasHeight: number): boolean {
		return clamp(0, this.x, canvasWidth / this.pixelSize) === this.x
			&& clamp(0, this.y, canvasHeight / this.pixelSize) === this.y;
	}

	protected override calibrateElements(pixels: readonly this[], movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): readonly this[] {
		const pixelSize = Panel.minPixelSize + Math.floor(((20 - movingBackgroundAmount) / 20) * (Panel.maxPixelSize - Panel.minPixelSize));
		const width = Math.ceil(canvasWidth / pixelSize);
		const height = Math.ceil(canvasHeight / pixelSize);

		if (pixels.length !== width * height) {
			return Array
				.from<Panel[]>({ length: height })
				.map((_ignoredRow, y) => Array
					.from<Panel>({ length: width })
					.map((_ignoredPixel, x) => Panel.random(x, y, pixelSize) as this))
				.flat();

		} else {
			return pixels;
		}
	}

	protected override render(_canvasWidth: number, _canvasHeight: number, [ x, y ]: [ number, number ]): boolean {
		const mouseDX = Math.abs((this.x * this.pixelSize) - x);
		const mouseDY = Math.abs((this.y * this.pixelSize) - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			this.colorKey = Panel.getRandomColorKey();
			return true;
		} else {
			return false;
		}
	}

	protected override paint(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void {
		const fillColor = Color.fromString(colorPalette[this.colorKey]).withAlpha(0.5).toString();
		const borderColor = Color.fromString(colorPalette[this.colorKey]).withAlpha(0.2).toString();

		context.beginPath();
		context.clearRect(...this.clearRectArguments);
		context.roundRect(...this.roundRectArguments);
		context.fillStyle = fillColor;
		context.strokeStyle = borderColor;
		context.stroke();
		context.fill();
	}
}
