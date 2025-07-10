import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

export type ColorKey = keyof BaseColorPalette;

export abstract class CanvasElement {
	public abstract readonly renderInterval: number;
	public abstract readonly paintInterval: number;

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


	// region element rendering
	public renderElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, mousePosition: [ number, number ]): readonly this[] {
		const renderedElements = <this[]>[];

		for (const canvasElement of canvasElements) {
			if (canvasElement.render(canvasWidth, canvasHeight, mousePosition)) {
				renderedElements.push(canvasElement);
			}
		}

		return renderedElements;
	}

	protected abstract render(canvasWidth: number, canvasHeight: number, mousePosition: [ number, number ]): boolean;
	// endregion element rendering


	// region element painting
	public paintElements(renderedElements: ReadonlySet<this>, context: CanvasRenderingContext2D, _canvasWidth: number, _canvasHeight: number, colorPalette: ColorPalette): void {
		for (const canvasElement of renderedElements) {
			canvasElement.draw(context, colorPalette);
		}
	}

	protected abstract draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void;
	// endregion element painting


	protected static getRandomColorKey(): ColorKey {
		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		return colorKeys[ Math.floor(Math.random() * colorKeys.length) ] as ColorKey;
	}
}
