import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

export abstract class CanvasElement {
	protected constructor() { }

	public abstract filterInBoundaryElements(canvasElements: this[], canvasWidth: number, canvasHeight: number): this[];
	public abstract calibrateElements(canvasElements: this[], calibration: number, canvasWidth: number, canvasHeight: number): this[];

	public abstract referenceMousePosition(mousePosition: [ number, number ]): void;
	public abstract move(canvasWidth: number, canvasHeight: number): void;
	public abstract draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void;
}
