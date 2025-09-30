import { computed, signal } from '@angular/core';
import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPaletteUtil } from 'src/app/core/colors/models/color-palettes/color-palette-util.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { xor } from 'src/app/core/functions/boolean/xor.function';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { shuffle } from 'src/app/core/functions/random/shuffle.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { CanvasSingleton } from 'src/app/features/background/models/canvas-singleton.model';

interface SvgPointTransform {
	readonly x: (x: number) => number;
	readonly y: (y: number) => number;
}

export class Grain extends CanvasSingleton {
	public static readonly svgOverlay = signal<SVGPathElement | null>(null);
	public readonly svgOverlayTransform = computed(() => this.getOverlayTransforms(Grain.svgOverlay()));

	public override readonly renderInterval = 40;
	public override readonly paintInterval = 40;

	private static readonly baselineRender = 1 / 16;
	private static readonly baselineVisibility = 1 / 64;
	private static readonly reversalRate = 9 / 10;
	private static readonly transparency = 0.15;

	private constructor(
		private readonly canvasWidth: number,
		private readonly canvasHeight: number,
		private readonly renderRate: number,
		private readonly visibilityTarget: number,
		private readonly grainOffsetSize: number,
		private readonly grainOffsets: [ number, number ][],
		private grainIndex = 0,
	) {
		super();
	}

	public static reference(): Grain {
		return new Grain(0, 0, 0, 0, 0, []);
	}

	protected override isReferenceType(canvasElement: CanvasElement): canvasElement is this {
		return canvasElement instanceof Grain;
	}

	protected override calibrate(canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): this {
		const grainOffsetSize = Math.floor(maxCalibration / 2);
		const grainOffsets = this.getGrainOffsets(grainOffsetSize);
		const renderRate = Grain.baselineRender * Math.pow(calibration, 0.5);
		const visibilityTarget = Grain.baselineVisibility * Math.pow(calibration, 0.5);

		return new Grain(canvasWidth, canvasHeight, renderRate, visibilityTarget, grainOffsetSize, grainOffsets) as this;
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
		return colorPalette.transparent(Grain.transparency);
	}

	protected override getStrokePalette(colorPalette: ColorPalette): ColorPalette {
		return ColorPaletteUtil.similar(colorPalette.paletteName).transparent(Grain.transparency);
	}

	protected override paint(context: CanvasRenderingContext2D, fillPalette: ColorPalette, strokePalette: ColorPalette): void {
		const [ xOffset, yOffset ] = this.getGrainOffset();
		const visibilityRate = this.getVisibilityRate(context);

		for (let y = yOffset; y < this.canvasHeight; y += this.grainOffsetSize) {
			for (let x = xOffset; x < this.canvasWidth; x += this.grainOffsetSize) {

				if (Math.random() > this.renderRate) continue;
				context.clearRect(x, y, 1, 1);

				if (Math.random() > visibilityRate) continue;
				const colorKey = BaseColorPalette.getRandomKey();

				const pointInOverlay = this.isPointInSvgOverlay(x, y);
				const reversePalette = (Math.random() > Grain.reversalRate);
				const pointPalette = xor(pointInOverlay, reversePalette)
					? strokePalette : fillPalette;

				context.fillStyle = pointPalette[colorKey];
				context.fillRect(x, y, 1, 1);
			}
		}
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

	/**
	 * icon placement:
	 * ▛▀▀▀▀▀▀▀▀▀▀▜
	 * ▌          ▐
	 * ▌ xx       ▐
	 * ▌ xx       ▐
	 * ▌          ▐
	 * ▌          ▐
	 * ▙▄▄▄▄▄▄▄▄▄▄▟
	 */
	private getOverlayTransforms(svgOverlay: SVGPathElement | null): SvgPointTransform {
		const { width, height } = Grain.getSvgLocalCoordinateSystem(svgOverlay);

		const xOffset = this.canvasWidth / 10;
		const yOffset = this.canvasHeight / 5;

		const xScale = (width / this.canvasWidth) * (5 / 2);
		const yScale = (height / this.canvasHeight) * (5 / 2);
		const scale = Math.max(xScale, yScale);

		return {
			x: (x: number) => (x - xOffset) * scale,
			y: (y: number) => (y - yOffset) * scale,
		};
	}

	private static getSvgLocalCoordinateSystem(svgOverlay: SVGPathElement | null): { width: number, height: number } {
		const svgViewportElement = svgOverlay?.viewportElement ?? null;

		return (svgViewportElement instanceof SVGSVGElement)
			? svgViewportElement.viewBox.baseVal
			: { width: 0, height: 0 };
	}

	private isPointInSvgOverlay(x: number, y: number): boolean {
		const svgOverlay = Grain.svgOverlay();
		const transform = this.svgOverlayTransform();

		const localCoordinatePoint = {
			x: transform.x(x),
			y: transform.y(y),
		};

		return svgOverlay?.isPointInFill(localCoordinatePoint) ?? false;
	}

	private getVisibilityRate(context: CanvasRenderingContext2D): number {
		const maxVisibilityRate = this.visibilityTarget * 4;
		const minVisibilityRate = this.visibilityTarget / 4;
		const visibilitySample = this.sampleCurrentVisibility(context);
		const visibilityRate = Math.pow(this.visibilityTarget, 2) * visibilitySample;

		return clamp(minVisibilityRate, visibilityRate, maxVisibilityRate);
	}

	/**
	 * image data is stored in a one dimensional uint8 array
	 * with 4 bit chunks for rgba
	 */
	private sampleCurrentVisibility(context: CanvasRenderingContext2D): number {
		const colorData = context.getImageData(0, 0, 64, 64).data;
		const transparencies = [];

		for (let index = 0; index < colorData.length; index += 4) {
			const alpha = colorData[index + 3];

			if (typeof alpha !== 'undefined') {
				transparencies.push(alpha / 255);
			}
		}

		const averageTransparency = transparencies.reduce((acc, current) => acc + current) / transparencies.length;
		return Grain.transparency / averageTransparency;
	}
}
