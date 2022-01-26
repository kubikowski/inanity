import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';

type ColorKey = keyof BaseColorPalette;

export class Circle extends CanvasElement {
	private static maxRadius = 40;
	private static minRadius = 10;

	private constructor(
		private x: number,
		private y: number,
		private dx: number,
		private dy: number,
		private radius: number,
		private dRadius: number,
		private colorKey: ColorKey,
	) {
		super();
	}

	public static random(): Circle {
		const dRadius = Math.floor((Math.random() - 0.5) * Circle.minRadius);
		const radius = Circle.minRadius + dRadius;

		const x = Math.random() * (Circle.canvasWidth - radius * 2) + radius;
		const y = Math.random() * (Circle.canvasHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof BaseColorPalette;

		return new Circle(x, y, dx, dy, radius, dRadius, colorKey);
	}

	public inBoundaries(canvasWidth: number, canvasHeight: number): boolean {
		return clamp(this.radius, this.x, canvasWidth - this.radius) === this.x
			&& clamp(this.radius, this.y, canvasHeight - this.radius) === this.y;
	}

	public referenceMousePosition([ x, y ]: [ number, number ]): void {
		const mouseDX = Math.abs(this.x - x);
		const mouseDY = Math.abs(this.y - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			if (this.radius < Circle.maxRadius + this.dRadius) {
				this.radius += 1.5;
			}
		} else if (this.radius > Circle.minRadius + this.dRadius) {
			this.radius -= 0.25;
		}
	}

	public move(): void {
		if (this.x + Circle.minRadius + this.dRadius >= Circle.canvasWidth ||
			this.x - Circle.minRadius - this.dRadius <= 0) {

			this.dx = -this.dx;
		}

		if (this.y + Circle.minRadius + this.dRadius >= Circle.canvasHeight ||
			this.y - Circle.minRadius - this.dRadius <= 0) {

			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	public draw(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.strokeStyle = Circle.colorPalette[this.colorKey];
		context.fillStyle = Circle.colorPalette[this.colorKey];
		context.stroke();
		context.fill();
	}
}
