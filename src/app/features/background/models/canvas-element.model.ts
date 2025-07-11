import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

export type ColorKey = keyof BaseColorPalette;

export abstract class CanvasElement {
	public abstract readonly renderInterval: number;
	public abstract readonly paintInterval: number;

	protected constructor() { }

	// region element validation
	public validateElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): readonly this[] {
		const referenceElements = this.validateElementTypes(canvasElements);
		const inBoundaryElements = this.filterInBoundaryElements(referenceElements, canvasWidth, canvasHeight);
		const calibratedElements = this.calibrateElements(inBoundaryElements, canvasWidth, canvasHeight, calibration, maxCalibration);

		return calibratedElements;
	}

	protected validateElementTypes(canvasElements: readonly this[]): readonly this[] {
		return canvasElements.filter(canvasElement => this.isReferenceType(canvasElement));
	}

	protected filterInBoundaryElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number): readonly this[] {
		return canvasElements.filter(canvasElement => canvasElement.inBoundaries(canvasWidth, canvasHeight));
	}

	protected abstract isReferenceType(canvasElement: this): canvasElement is this;
	protected abstract inBoundaries(canvasWidth: number, canvasHeight: number): boolean;
	protected abstract calibrateElements(canvasElements: readonly this[], canvasWidth: number, canvasHeight: number, calibration: number, maxCalibration: number): readonly this[];
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
	public paintElements(renderedElements: ReadonlySet<this>, context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, colorPalette: ColorPalette): void {
		if (this.shouldClearCanvas(renderedElements, canvasWidth, canvasHeight)) {
			this.clearCanvas(context, canvasWidth, canvasHeight);
		}

		for (const canvasElement of renderedElements) {
			canvasElement.paint(context, colorPalette);
		}
	}

	protected clearCanvas(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	protected abstract shouldClearCanvas(renderedElements: ReadonlySet<this>, canvasWidth: number, canvasHeight: number): boolean;
	protected abstract paint(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void;
	// endregion element painting


	protected static getRandomColorKey(): ColorKey {
		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		return colorKeys[ Math.floor(Math.random() * colorKeys.length) ] as ColorKey;
	}
}
