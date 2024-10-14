import { computed, inject, Injectable, untracked } from '@angular/core';
import { animationFrameScheduler, combineLatest, interval } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Circle } from 'src/app/features/background/models/circle.model';
import { CanvasService } from 'src/app/features/background/services/canvas.service';
import { MovingBackgroundService } from 'src/app/features/background/services/moving-background.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private readonly colorsService = inject(ColorsService);
	private readonly movingBackgroundService = inject(MovingBackgroundService);

	private readonly mousePosition = computed<[ number, number ]>(() => {
		const [ x, y ] = this.screenDetectorService.mousePosition();
		return [ x * this.pixelDensity(), (y - this.canvasTopOffset()) * this.pixelDensity() ];
	});

	public override initialize(canvas: HTMLCanvasElement): void {
		super.initialize(canvas);

		this.initializeCanvasElements();
		this.initializeFrameRefresh();
	}

	protected override initializeCanvasSize(): void {
		super.initializeCanvasSize();

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
		const context = untracked(this.context);
		const mousePosition = untracked(this.mousePosition);
		const colorPalette = untracked(this.colorsService.palette);

		if (context !== null) {
			context.clearRect(0, 0, untracked(this.canvasWidth), untracked(this.canvasHeight));

			for (const canvasElement of this.canvasElements) {
				canvasElement.referenceMousePosition(mousePosition);
				canvasElement.move();
				canvasElement.draw(context, colorPalette);
			}
		}
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
			.filter(circle => !circle.inBoundaries(untracked(this.canvasWidth), untracked(this.canvasHeight))));

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
