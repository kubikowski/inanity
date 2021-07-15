export abstract class CanvasElement {
	public static screenWidth: number;
	public static screenHeight: number;

	protected constructor() { }

	public abstract referenceMousePosition(mousePosition: [ number, number ]): void;
	public abstract move(): void;
	public abstract draw(context: CanvasRenderingContext2D): void;
}
