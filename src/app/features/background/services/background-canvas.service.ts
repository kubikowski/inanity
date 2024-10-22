import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Circle } from 'src/app/features/background/models/circle.model';
import { CanvasService } from 'src/app/features/background/services/canvas.service';
import { MovingBackgroundService } from 'src/app/features/background/services/moving-background.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private readonly movingBackgroundService = inject(MovingBackgroundService);

	protected readonly canvasTopOffset = computed(() => this.canvas()?.getBoundingClientRect().top ?? 0);
	protected readonly rawCanvasWidth = this.screenDetectorService.screenWidth.asReadonly();
	protected readonly rawCanvasHeight = computed(() => this.screenDetectorService.screenHeight() - this.canvasTopOffset());

	private readonly mousePosition = computed<[ number, number ]>(() => {
		const [ x, y ] = this.screenDetectorService.mousePosition();
		return [ x * this.pixelDensity(), (y - this.canvasTopOffset()) * this.pixelDensity() ];
	});

	protected canvasElements = Array<CanvasElement>();

	public constructor() {
		super();

		effect(() => {
			this.manageCircles(this.movingBackgroundService.amount(), this.canvasWidth(), this.canvasHeight());
		});
	}

	public override initialize(canvas: HTMLCanvasElement): void {
		super.initialize(canvas);

		this.initializeFrameRefresh();
	}

	private initializeFrameRefresh(): void {
		this.subscriptions.sink = interval(10, animationFrameScheduler)
			.pipe(filter(() => untracked(this.movingBackgroundService.enabled)))
			.subscribe(() => this.renderFrame());
	}

	private renderFrame(): void {
		const context = untracked(this.context);
		const canvasWidth = untracked(this.canvasWidth);
		const canvasHeight = untracked(this.canvasHeight);
		const mousePosition = untracked(this.mousePosition);
		const colorPalette = untracked(this.colorsService.palette);

		if (context !== null) {
			context.clearRect(0, 0, canvasWidth, canvasHeight);

			for (const canvasElement of this.canvasElements) {
				canvasElement.referenceMousePosition(mousePosition);
				canvasElement.move(canvasWidth, canvasHeight);
				canvasElement.draw(context, colorPalette);
			}
		}
	}

	private manageCircles(movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): void {
		this.removeOutOfBoundCircles(canvasWidth, canvasHeight);
		this.calibrateCircleAmount(movingBackgroundAmount, canvasWidth, canvasHeight);
	}

	private removeOutOfBoundCircles(canvasWidth: number, canvasHeight: number): void {
		const outOfBoundCircles = new Set(this.circles
			.filter(circle => !circle.inBoundaries(canvasWidth, canvasHeight)));

		this.canvasElements = this.canvasElements
			.filter(canvasElement => !outOfBoundCircles.has(canvasElement as Circle));
	}

	private calibrateCircleAmount(movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): void {
		const idealAmount = movingBackgroundAmount * 20;
		const currentAmount = this.circles.length;

		if (idealAmount < currentAmount) {
			this.removeCircles(idealAmount);

		} else if (idealAmount > currentAmount) {
			this.addCircles(idealAmount - currentAmount, canvasWidth, canvasHeight);
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

	private addCircles(addCircleAmount: number, canvasWidth: number, canvasHeight: number): void {
		const addedCircles = Array
			.from({ length: addCircleAmount })
			.map(() => Circle.random(canvasWidth, canvasHeight));

		this.canvasElements.push(...addedCircles);
	}
}
