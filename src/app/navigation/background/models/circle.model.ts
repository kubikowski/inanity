import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';

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

		const x = Math.random() * (CanvasElement.canvasWidth - radius * 2) + radius;
		const y = Math.random() * (CanvasElement.canvasHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		const colorKeys = Object.keys(BaseColorPalette.CssPaletteVariables) as ColorKey[];
		const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];

		return new Circle(x, y, dx, dy, radius, dRadius, colorKey);
	}

	public referenceMousePosition([ x, y ]: [ number, number ]): void {
		const mouseDX = Math.abs(this.x - x);
		const mouseDY = Math.abs(this.y - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			if (this.radius < Circle.maxRadius + this.dRadius) {
				this.radius++;
			}
		} else if (this.radius > Circle.minRadius + this.dRadius) {
			this.radius--;
		}
	}

	public move(): void {
		if (this.x + Circle.minRadius + this.dRadius >= CanvasElement.canvasWidth ||
			this.x - Circle.minRadius - this.dRadius <= 0) {

			this.dx = -this.dx;
		}

		if (this.y + Circle.minRadius + this.dRadius >= CanvasElement.canvasHeight ||
			this.y - Circle.minRadius - this.dRadius <= 0) {

			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	public draw(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.strokeStyle = CanvasElement.colorPalette[this.colorKey];
		context.fillStyle = CanvasElement.colorPalette[this.colorKey];
		context.stroke();
		context.fill();
	}
}
