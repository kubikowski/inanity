import { Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { animationFrameScheduler, combineLatest, interval } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { ScreenDetectorService } from 'src/app/core/browser/screen-detector.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Circle } from 'src/app/features/background/models/circle.model';
import { CanvasService } from 'src/app/features/background/services/canvas.service';
import { MovingBackgroundService } from 'src/app/features/background/services/moving-background.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private canvasTopOffset = 0;
	private mousePosition: [ number, number ] = [ 0, 0 ];

	public constructor(
		private readonly colorsService: ColorsService,
		private readonly movingBackgroundService: MovingBackgroundService,
		screenDetectorService: ScreenDetectorService,
	) {
		super(screenDetectorService);

		this.handleMousePosition();
		this.handleColorPalette();
	}

	public handleMousePosition(): void {
		this.subscriptions.sink = this.screenDetectorService.mousePosition$
			.pipe(map(([ x, y ]) => [ x * this.pixelDensity, (y - this.canvasTopOffset) * this.pixelDensity ] as [ number, number ]))
			.subscribe(mousePosition => this.mousePosition = mousePosition);
	}

	public handleColorPalette(): void {
		this.subscriptions.sink = toObservable(this.colorsService.palette)
			.subscribe(colorPalette => CanvasElement.colorPalette = colorPalette);
	}

	public override initialize(canvas: HTMLCanvasElement): void {
		super.initialize(canvas);

		this.initializeCanvasElements();
		this.initializeFrameRefresh();
	}

	protected override initializeCanvasSize(): void {
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

	private initializeFrameRefresh(): void {
		this.subscriptions.sink = interval(10, animationFrameScheduler)
			.pipe(filter(() => this.movingBackgroundService.isEnabled))
			.subscribe(() => this.renderFrame());
	}

	private renderFrame(): void {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.canvasElements.forEach(canvasElement => canvasElement.referenceMousePosition(this.mousePosition));
		this.canvasElements.forEach(canvasElement => canvasElement.move());
		this.canvasElements.forEach(canvasElement => canvasElement.draw(this.context));
	}

	private initializeCanvasElements(): void {
		this.subscriptions.sink = combineLatest([
			this.movingBackgroundService.amount$,
			this.canvasWidth$,
			this.canvasHeight$,
		]).pipe(debounceTime(0))
			.subscribe(() => this.manageCircles());
	}

	private manageCircles(): void {
		this.removeOutOfBoundCircles();
		this.calibrateCircleAmount();
	}

	private removeOutOfBoundCircles(): void {
		const outOfBoundCircles = new Set(this.circles
			.filter(circle => !circle.inBoundaries(this.canvasWidth, this.canvasHeight)));

		this.canvasElements = this.canvasElements
			.filter(canvasElement => !outOfBoundCircles.has(canvasElement as Circle));
	}

	private calibrateCircleAmount(): void {
		const idealAmount = this.movingBackgroundService.amount * 20;
		const currentAmount = this.circles.length;

		if (idealAmount < currentAmount) {
			this.removeCircles(idealAmount);

		} else if (idealAmount > currentAmount) {
			this.addCircles(idealAmount - currentAmount);
		}
	}

	private get circles(): Circle[] {
		return this.canvasElements
			.filter(canvasElement => canvasElement instanceof Circle) as Circle[];
	}

	private removeCircles(idealAmount: number): void {
		const removedCircles = new Set(this.circles.slice(idealAmount));

		this.canvasElements = this.canvasElements
			.filter(canvasElement => !removedCircles.has(canvasElement as Circle));
	}

	private addCircles(addCircleAmount: number): void {
		const addedCircles = Array
			.from({ length: addCircleAmount })
			.map(() => Circle.random());

		this.canvasElements.push(...addedCircles);
	}
}
