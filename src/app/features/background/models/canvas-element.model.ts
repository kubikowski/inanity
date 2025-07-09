import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

export type ColorKey = keyof BaseColorPalette;

export abstract class CanvasElement {
	public abstract readonly animationInterval: number;
	public abstract readonly renderInterval: number;

	protected constructor() { }

	// region element validation
	public validateElements(canvasElements: readonly this[], calibration: number, canvasWidth: number, canvasHeight: number): readonly this[] {
		const inBoundaryElements = this.filterInBoundaryElements(canvasElements, canvasWidth, canvasHeight);
		const calibratedElements = this.calibrateElements(inBoundaryElements, calibration, canvasWidth, canvasHeight);

		return calibratedElements;
	}

	protected filterInBoundaryElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number): readonly this[] {
		return canvasElements.filter(canvasElement => canvasElement.inBoundaries(canvasWidth, canvasHeight));
	}

	protected abstract inBoundaries(canvasWidth: number, canvasHeight: number): boolean;
	protected abstract calibrateElements(canvasElements: readonly this[], calibration: number, canvasWidth: number, canvasHeight: number): readonly this[];
	// endregion element validation


	// region element animation
	public animateElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, mousePosition: [ number, number ]): readonly this[] {
		for (const canvasElement of canvasElements) {
			canvasElement.referenceMousePosition(mousePosition);
			canvasElement.move(canvasWidth, canvasHeight);
		}

		return canvasElements;
	}

	protected abstract referenceMousePosition(mousePosition: [ number, number ]): void;
	protected abstract move(canvasWidth: number, canvasHeight: number): void;
	// endregion element animation


	// region element rendering
	public renderElements(animatedElements: readonly this[], context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, colorPalette: ColorPalette): void {
		context.clearRect(0, 0, canvasWidth, canvasHeight);

		for (const canvasElement of animatedElements) {
			canvasElement.draw(context, colorPalette);
		}
	}

	protected abstract draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void;
	// endregion element rendering


	protected static getRandomColorKey(): ColorKey {
		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		return colorKeys[ Math.floor(Math.random() * colorKeys.length) ] as ColorKey;
	}
}
