import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';

export class Circle extends CanvasElement {
	private static maxRadius = 50;
	private static minRadius = 10;

	private constructor(
		public x: number,
		public y: number,
		private dx: number,
		private dy: number,
		public radius: number,
	) {
		super();
	}

	public static random(): Circle {
		const radius = Circle.minRadius;

		const x = Math.random() * (CanvasElement.screenWidth - radius * 2) + radius;
		const y = Math.random() * (CanvasElement.screenHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		return new Circle(x, y, dx, dy, radius);
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
		context.strokeStyle = 'rgba(0, 0, 0, 50%)';
		context.fillStyle = 'rgba(0, 0, 0, 50%)';
		context.stroke();
		context.fill();
	}
}
