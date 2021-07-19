import { ElementRef, Injectable } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';
import { Circle } from 'src/app/navigation/background/models/circle.model';
import { CanvasService } from 'src/app/shared/canvas/canvas.service';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { MovingBackgroundService } from 'src/app/shared/moving-background/moving-background.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private canvasTopOffset: number;
	private mousePosition: [ number, number ];

	constructor(
		private readonly colorsService: ColorsService,
		private readonly movingBackgroundService: MovingBackgroundService,
		screenDetectorService: ScreenDetectorService,
	) {
		super(screenDetectorService);

		this.subscriptions.sink = this.screenDetectorService.mousePosition$
			.pipe(map(([ x, y ]) => [ x * this.pixelDensity, (y - this.canvasTopOffset) * this.pixelDensity ] as [ number, number ]))
			.subscribe(mousePosition => this.mousePosition = mousePosition);

		this.subscriptions.sink = this.colorsService.palette$
			.subscribe(colorPalette => CanvasElement.colorPalette = colorPalette);
	}

	public initialize(canvasRef: ElementRef<HTMLCanvasElement>): void {
		super.initialize(canvasRef);

		this.subscriptions.sink = this.movingBackgroundService.amount$
			.subscribe(amount => this.manageCircleAmount(amount * 20));

		this.subscriptions.sink = interval(10, animationFrameScheduler)
			.pipe(filter(() => this.movingBackgroundService.isEnabled))
			.subscribe(() => this.renderFrame());
	}

	protected initializeCanvasSize(): void {
		super.initializeCanvasSize();

		this.subscriptions.sink = this.screenDetectorService.screenWidth$
			.subscribe(screenWidth => this.rawCanvasWidth = screenWidth);

		this.subscriptions.sink = this.screenDetectorService.screenHeight$
			.pipe(
				tap(() => this.canvasTopOffset = this.canvas.getBoundingClientRect().top),
				map(screenHeight => screenHeight - this.canvasTopOffset),
			).subscribe(rawCanvasHeight => this.rawCanvasHeight = rawCanvasHeight);

		this.subscriptions.sink = this.canvasWidth$
			.subscribe(canvasWidth => CanvasElement.canvasWidth = canvasWidth);

		this.subscriptions.sink = this.canvasHeight$
			.subscribe(canvasHeight => CanvasElement.canvasHeight = canvasHeight);
	}

	private renderFrame(): void {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.canvasElements.forEach(canvasElement => canvasElement.referenceMousePosition(this.mousePosition));
		this.canvasElements.forEach(canvasElement => canvasElement.move());
		this.canvasElements.forEach(canvasElement => canvasElement.draw(this.context));
	}

	public manageCircleAmount(amount: number): void {
		const circles = this.canvasElements
			.filter(canvasElement => canvasElement instanceof Circle) as Circle[];

		while (amount < circles.length) {
			const circle = circles.pop();

			this.canvasElements.splice(this.canvasElements.indexOf(circle), 1);
		}

		while (amount > circles.length) {
			const circle = Circle.random();

			circles.push(circle);
			this.canvasElements.push(circle);
		}
	}
}
