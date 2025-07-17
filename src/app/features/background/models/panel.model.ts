import { BaseColorPalette, ColorKey } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

class PanelCorners extends Array {
	public static enabledCornerOptions = [
		[ 0, 0, 0, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 0, 1, 0 ],
		[ 1, 1, 1, 1 ],
	] as const;

	public static getRandomCorners(panelSize: number): PanelCorners {
		const enabledCorners = this.enabledCornerOptions.at(Math.floor(Math.random() * 4))!;

		return enabledCorners.map(enabled => Math.floor((enabled + 1) * (panelSize / 8)));
	}
}

export class Panel extends CanvasElement {
	private static readonly maxPanelSize = 48;
	private static readonly minPanelSize = 8;

	public override readonly renderInterval = 20;
	public override readonly paintInterval = 100;

	private readonly clearRectArguments: [ x: number, y: number, w: number, h: number ];
	private readonly roundRectArguments: [ x: number, y: number, w: number, h: number, radii: PanelCorners ];

	private constructor(
		private readonly x: number,
		private readonly y: number,
		private readonly panelSize: number,
		private readonly xOffset = 0,
		private readonly yOffset = 0,
		private colorKey: ColorKey,
	) {
		super();

		this.clearRectArguments = [
			(this.x * this.panelSize) - this.xOffset,
			(this.y * this.panelSize) - this.yOffset,
			this.panelSize,
			this.panelSize,
		];

		this.roundRectArguments = [
			((this.x + 1 / 6) * this.panelSize) - this.xOffset,
			((this.y + 1 / 6) * this.panelSize) - this.yOffset,
			this.panelSize * 2 / 3,
			this.panelSize * 2 / 3,
			PanelCorners.getRandomCorners(this.panelSize),
		];
	}

	public static reference(): Panel {
		return new Panel(0, 0, 0, 0, 0, BaseColorPalette.getRandomKey());
	}

	public static random(x: number, y: number, panelSize: number, xOffset: number, yOffset: number): Panel {
		return new Panel(x, y, panelSize, xOffset, yOffset, BaseColorPalette.getRandomKey());
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Panel;
	}

	protected override inBoundaries(canvasWidth: number, canvasHeight: number): boolean {
		return clamp(0, this.x, canvasWidth / this.panelSize) === this.x
			&& clamp(0, this.y, canvasHeight / this.panelSize) === this.y;
	}

	protected override calibrateElements(panels: readonly this[], canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): readonly this[] {
		const panelSize = this.getPanelSize(calibration, maxCalibration);
		const [ width, height ] = this.getPanelDimensions(panelSize, canvasWidth, canvasHeight);
		const [ xOffset, yOffset ] = this.getPanelOffsets(panelSize, canvasWidth, canvasHeight);

		if (panels.length !== width * height) {
			return Array
				.from<Panel[]>({ length: height })
				.map((_ignoredRow, y) => Array
					.from<Panel>({ length: width })
					.map((_ignoredPixel, x) => Panel.random(x, y, panelSize, xOffset, yOffset) as this))
				.flat();

		} else {
			return panels;
		}
	}

	protected getPanelSize(calibration: number, maxCalibration: number): number {
		const panelCalibration = ((maxCalibration - calibration) / maxCalibration);
		return Panel.minPanelSize + Math.floor(panelCalibration * (Panel.maxPanelSize - Panel.minPanelSize));
	}

	protected getPanelDimensions(panelSize: number, canvasWidth: number, canvasHeight: number): [ number, number ] {
		const width = Math.ceil(canvasWidth / panelSize);
		const height = Math.ceil(canvasHeight / panelSize);

		return [ width, height ];
	}

	protected getPanelOffsets(panelSize: number, canvasWidth: number, canvasHeight: number): [ number, number ] {
		const xOffset = (canvasWidth % panelSize > 0) ? (panelSize - (canvasWidth % panelSize)) / 2 : 0;
		const yOffset = (canvasHeight % panelSize > 0) ? (panelSize - (canvasHeight % panelSize)) / 2 : 0;

		return [ xOffset, yOffset ];
	}

	protected override render(_canvasWidth: number, _canvasHeight: number, [ x, y ]: [ number, number ]): boolean {
		const mouseDX = Math.abs((this.x * this.panelSize) - x);
		const mouseDY = Math.abs((this.y * this.panelSize) - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			this.colorKey = BaseColorPalette.getRandomKey();
			return true;
		} else {
			return false;
		}
	}

	protected override shouldClearCanvas(renderedElements: ReadonlySet<this>, canvasWidth: number, canvasHeight: number): boolean {
		const reference = renderedElements.values().next().value as this ?? null;

		if (reference === null) {
			return false;
		} else {
			const [ width, height ] = this.getPanelDimensions(reference.panelSize, canvasWidth, canvasHeight);
			return renderedElements.size === width * height;
		}
	}

	public override getFillPalette(colorPalette: ColorPalette): ColorPalette {
		return colorPalette.transparent(0.5);
	}

	public override getStrokePalette(colorPalette: ColorPalette): ColorPalette {
		return colorPalette.transparent(0.35);
	}

	protected override paint(context: CanvasRenderingContext2D, fillPalette: ColorPalette, strokePalette: ColorPalette): void {
		context.beginPath();
		context.clearRect(...this.clearRectArguments);
		context.roundRect(...this.roundRectArguments);
		context.fillStyle = fillPalette[this.colorKey];
		context.strokeStyle = strokePalette[this.colorKey];
		context.stroke();
		context.fill();
	}
}
