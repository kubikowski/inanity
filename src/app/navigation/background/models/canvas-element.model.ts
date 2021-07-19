import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';

export abstract class CanvasElement {
	public static canvasWidth: number;
	public static canvasHeight: number;
	public static colorPalette: ColorPalette;

	protected constructor() { }

	public abstract referenceMousePosition(mousePosition: [ number, number ]): void;
	public abstract move(): void;
	public abstract draw(context: CanvasRenderingContext2D): void;
}
