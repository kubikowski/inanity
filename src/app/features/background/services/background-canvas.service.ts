import { computed, effect, inject, Injectable, untracked } from '@angular/core';
import { animationFrameScheduler, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Circle } from 'src/app/features/background/models/circle.model';
import { Pixel } from 'src/app/features/background/models/pixel.model';
import { BackgroundService } from './background.service';
import { CanvasService } from './canvas.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private readonly backgroundService = inject(BackgroundService);

	protected readonly canvasTopOffset = computed(() => this.canvas()?.getBoundingClientRect().top ?? 0);
	protected readonly rawCanvasWidth = this.screenService.screenWidth.asReadonly();
	protected readonly rawCanvasHeight = computed(() => this.screenService.screenHeight() - this.canvasTopOffset());

	private readonly mousePosition = computed<[ number, number ]>(() => {
		const [ x, y ] = this.screenService.mousePosition();
		return [ x * this.pixelDensity(), (y - this.canvasTopOffset()) * this.pixelDensity() ];
	});

	protected canvasElements = Array<CanvasElement>();

	public constructor() {
		super();

		effect(() => {
			this.manageElements(this.backgroundService.amount(), this.canvasWidth(), this.canvasHeight());
		});
	}

	public override initialize(canvas: HTMLCanvasElement): void {
		super.initialize(canvas);

		this.initializeFrameRefresh();
	}

	private initializeFrameRefresh(): void {
		this.subscriptions.sink = interval(100, animationFrameScheduler)
			.pipe(filter(() => untracked(this.backgroundService.moving)))
			.subscribe(() => this.renderFrame());
	}

	/**
	 * TODO: Performance rendering changes:
	 *  1. partial frame rendering:
	 *   a.    modifiedElements: CanvasElement[]
	 *  2. contextual frame rate:
	 *   a.    separate animations from rendering steps
	 *   b.    ideal render timing by canvasElement spec: ie 100fps vs 8fps
	 */
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

	private manageElements(movingBackgroundAmount: number, canvasWidth: number, canvasHeight: number): void {
		const element = Pixel.random(canvasWidth, canvasHeight, 2);

		this.canvasElements = element.filterInBoundaryElements(this.canvasElements as Pixel[], canvasWidth, canvasHeight);
		this.canvasElements = element.calibrateElements(this.canvasElements as Pixel[], movingBackgroundAmount, canvasWidth, canvasHeight);
	}
}
