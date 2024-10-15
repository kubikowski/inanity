import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

export abstract class CanvasElement {
	protected constructor() { }

	public abstract referenceMousePosition(mousePosition: [ number, number ]): void;
	public abstract move(canvasWidth: number, canvasHeight: number): void;
	public abstract draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void;
}
