import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CanvasElement } from 'src/app/navigation/background/models/canvas-element.model';
import { Circle } from 'src/app/navigation/background/models/circle.model';
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
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: ElementRef<HTMLCanvasElement>): void {
		this.context = canvas.nativeElement.getContext('2d');

		this.subscriptions.sink = this.movingBackgroundService.amount$
			.subscribe(amount => this.manageCircleAmount(amount * 10));

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

	// public addRectangle(size: number): void {
	// 	this.context.fillStyle = BackgroundCanvasService.randomColorString;
	//
	// 	this.context.fillRect(size, size, size, size);
	// }
	//
	// public beginLineSegment(x: number, y: number): void {
	// 	this.context.beginPath();
	//
	// 	this.context.moveTo(x, y);
	// }
	//
	// public addLineSegment(x: number, y: number): void {
	// 	this.context.strokeStyle = BackgroundCanvasService.randomColorString;
	//
	// 	this.context.lineTo(x, y);
	//
	// 	this.context.stroke();
	// }

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

	private static get randomColorString(): string {
		const red = Math.floor(Math.random() * 255);
		const green = Math.floor(Math.random() * 255);
		const blue = Math.floor(Math.random() * 255);

		return `rgba(${ red }, ${ green }, ${ blue }, 0.25)`;
	}
}
