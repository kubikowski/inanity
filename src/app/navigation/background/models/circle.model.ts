import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';

export class Circle extends CanvasElement {
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
		const radius = 30;

		const x = Math.random() * (CanvasElement.screenWidth - radius * 2) + radius;
		const y = Math.random() * (CanvasElement.screenHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		return new Circle(x, y, dx, dy, radius);
	}

	public move(): void {
		if (this.x + this.radius >= Circle.screenWidth || this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius >= Circle.screenHeight || this.y - this.radius <= 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	public draw(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.strokeStyle = 'rgba(0, 0, 0, 50%)';
		context.stroke();
	}
}
