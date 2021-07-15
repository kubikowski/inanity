import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';

type ColorKey = keyof BaseColorPalette;

export class Circle extends CanvasElement {
	private static maxRadius = 50;
	private static minRadius = 10;

	private constructor(
		private x: number,
		private y: number,
		private dx: number,
		private dy: number,
		private radius: number,
		private colorKey: ColorKey,
	) {
		super();
	}

	public static random(): Circle {
		const radius = Circle.minRadius;

		const x = Math.random() * (CanvasElement.screenWidth - radius * 2) + radius;
		const y = Math.random() * (CanvasElement.screenHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		const colorKeys = Object.keys(BaseColorPalette.CssPaletteVariables) as ColorKey[];
		const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];

		return new Circle(x, y, dx, dy, radius, colorKey);
	}

	public referenceMousePosition([ x, y ]: [ number, number ]): void {
		const mouseDX = Math.abs(this.x - x);
		const mouseDY = Math.abs(this.y - y);
		const mouseDistance = Math.sqrt(Math.pow(mouseDX, 2) + Math.pow(mouseDY, 2));

		if (mouseDistance < 100) {
			if (this.radius < Circle.maxRadius) {
				this.radius++;
			}
		} else if (this.radius > Circle.minRadius) {
			this.radius--;
		}
	}

	public move(): void {
		if (this.x + Circle.minRadius >= Circle.screenWidth || this.x - Circle.minRadius <= 0) {
			this.dx = -this.dx;
		}

		if (this.y + Circle.minRadius >= Circle.screenHeight || this.y - Circle.minRadius <= 0) {
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
