import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';
import { Circle } from 'src/app/navigation/background/models/circle.model';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { MovingBackgroundService } from 'src/app/shared/moving-background/moving-background.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';
import { SubSink } from 'subsink';

@Injectable()
export class BackgroundCanvasService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private screenWidth: number;
	private screenHeight: number;
	private mousePosition: [ number, number ];

	private context: CanvasRenderingContext2D;
	private canvasElements = Array<CanvasElement>();

	constructor(
		private readonly colorsService: ColorsService,
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly movingBackgroundService: MovingBackgroundService,
	) {
		this.subscriptions.sink = this.screenDetectorService.screenWidth$
			.pipe(tap(screenWidth => CanvasElement.screenWidth = screenWidth))
			.subscribe(screenWidth => this.screenWidth = screenWidth);

		this.subscriptions.sink = this.screenDetectorService.screenHeight$
			.pipe(tap(screenHeight => CanvasElement.screenHeight = screenHeight))
			.subscribe(screenHeight => this.screenHeight = screenHeight);

		this.subscriptions.sink = this.screenDetectorService.mousePosition$
			.subscribe(mousePosition => this.mousePosition = mousePosition);

		this.subscriptions.sink = this.colorsService.palette$
			.subscribe(colorPalette => CanvasElement.colorPalette = colorPalette);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: ElementRef<HTMLCanvasElement>): void {
		this.context = canvas.nativeElement.getContext('2d');

		this.subscriptions.sink = this.movingBackgroundService.amount$
			.subscribe(amount => this.manageCircleAmount(amount * 20));

		this.subscriptions.sink = interval(10, animationFrameScheduler)
			.pipe(filter(() => this.movingBackgroundService.isEnabled))
			.subscribe(() => this.renderFrame());
	}

	private renderFrame(): void {
		this.context.clearRect(0, 0, this.screenWidth, this.screenHeight);

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
