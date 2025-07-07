import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { Color } from 'src/app/core/colors/models/color.model';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

type ColorKey = keyof BaseColorPalette;

export class Pixel extends CanvasElement {
	private static readonly maxPixelSize = 40;
	private static readonly minPixelSize = 10;

	private constructor(
		private x: number,
		private y: number,
		private pixelSize: number,
		private colorKey: ColorKey,
	) {
		super();
	}

	public static random(x: number, y: number, pixelSize: number): Pixel {
		return new Pixel(x, y, pixelSize, Pixel.getRandomColorKey());
	}

	public filterInBoundaryElements(pixels: this[], canvasWidth: number, canvasHeight: number): this[] {
		return pixels.filter(pixel => pixel.inBoundaries(canvasWidth, canvasHeight));
	}

	private inBoundaries(canvasWidth: number, canvasHeight: number): boolean {
		return clamp(0, this.x, canvasWidth / this.pixelSize) === this.x
			&& clamp(0, this.y, canvasHeight / this.pixelSize) === this.y;
	}

	public calibrateElements(pixels: this[], movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): this[] {
		const pixelSize = Pixel.minPixelSize + Math.floor((Pixel.maxPixelSize - Pixel.minPixelSize) / movingBackgroundAmount);
		const width = Math.ceil(canvasWidth / pixelSize);
		const height = Math.ceil(canvasHeight / pixelSize);

		if (pixels.length !== width * height) {
			return Array
				.from({ length: height })
				.map((_ignoredX, y) => Array
					.from({ length: width })
					.map((_ignoredY, x) => Pixel.random(x, y, pixelSize) as this))
				.flat();

		} else {
			return pixels;
		}
	}

	public referenceMousePosition([ x, y ]: [ number, number ]): void {
		const mouseDX = Math.abs((this.x * this.pixelSize) - x);
		const mouseDY = Math.abs((this.y * this.pixelSize) - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			this.colorKey = Pixel.getRandomColorKey();
		}
	}

	private static getRandomColorKey(): keyof BaseColorPalette {
		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		return colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof BaseColorPalette;
	}

	public move(_ignoredCanvasWidth: number, _ignoredCanvasHeight: number): void {
	}

	public draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void {
		const color = Color.fromString(colorPalette[this.colorKey]).withAlpha(0.5).toString();

		context.beginPath();
		context.roundRect((this.x + 1 / 6) * this.pixelSize, (this.y + 1 / 6) * this.pixelSize, this.pixelSize * 2 / 3, this.pixelSize * 2 / 3, Math.floor(this.pixelSize / 4));
		context.strokeStyle = color;
		context.fillStyle = color;
		context.stroke();
		context.fill();
	}
}
