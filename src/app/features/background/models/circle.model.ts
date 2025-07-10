import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { clamp } from 'src/app/core/functions/number/clamp.function';
import { CanvasElement, ColorKey } from 'src/app/features/background/models/canvas-element.model';

export class Circle extends CanvasElement {
	private static readonly maxRadius = 40;
	private static readonly minRadius = 10;

	public override readonly renderInterval = 8;
	public override readonly paintInterval = 16;

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

	public static reference(): Circle {
		return new Circle(0, 0, 0, 0, 0, 0, Circle.getRandomColorKey());
	}

	public static random(canvasWidth: number, canvasHeight: number): Circle {
		const dRadius = Math.floor((Math.random() - 0.5) * Circle.minRadius);
		const radius = Circle.minRadius + dRadius;

		const x = Math.random() * (canvasWidth - radius * 2) + radius;
		const y = Math.random() * (canvasHeight - radius * 2) + radius;

		const dx = Math.random() - 0.5;
		const dy = Math.random() - 0.5;

		const colorKey = this.getRandomColorKey();

		return new Circle(x, y, dx, dy, radius, dRadius, colorKey);
	}

	protected override inBoundaries(canvasWidth: number, canvasHeight: number): boolean {
		return clamp(this.radius, this.x, canvasWidth - this.radius) === this.x
			&& clamp(this.radius, this.y, canvasHeight - this.radius) === this.y;
	}

	protected override calibrateElements(circles: readonly this[], movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): readonly this[] {
		const idealAmount = movingBackgroundAmount * 20;
		const currentAmount = circles.length;

		if (idealAmount < currentAmount) {
			return circles.slice(0, idealAmount);

		} else if (idealAmount > currentAmount) {
			const addedCircles = Array
				.from({ length: idealAmount - currentAmount })
				.map(() => Circle.random(canvasWidth, canvasHeight) as this);

			return [ ...circles, ...addedCircles ];
		} else {
			return circles;
		}
	}

	protected override render(canvasWidth: number, canvasHeight: number, mousePosition: [ number, number ]): true {
		this.referenceMousePosition(mousePosition);
		this.move(canvasWidth, canvasHeight);

		return true;
	}

	private referenceMousePosition([ x, y ]: [ number, number ]): void {
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

	private move(canvasWidth: number, canvasHeight: number): void {
		if (this.x + Circle.minRadius + this.dRadius >= canvasWidth ||
			this.x - Circle.minRadius - this.dRadius <= 0) {

			this.dx = -this.dx;
		}

		if (this.y + Circle.minRadius + this.dRadius >= canvasHeight ||
			this.y - Circle.minRadius - this.dRadius <= 0) {

			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	public override paintElements(renderedElements: ReadonlySet<this>, context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, colorPalette: ColorPalette): void {
		context.clearRect(0, 0, canvasWidth, canvasHeight);

		super.paintElements(renderedElements, context, canvasWidth, canvasHeight, colorPalette);
	}

	protected override draw(context: CanvasRenderingContext2D, colorPalette: ColorPalette): void {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fillStyle = colorPalette[this.colorKey];
		context.strokeStyle = colorPalette[this.colorKey];
		context.stroke();
		context.fill();
	}
}
