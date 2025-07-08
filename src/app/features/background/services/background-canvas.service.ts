import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Circle } from 'src/app/features/background/models/circle.model';
import { BackgroundService } from './background.service';
import { CanvasService } from './canvas.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	private readonly backgroundService = inject(BackgroundService);
	private readonly animationFrameService = inject(AnimationFrameService);

	protected readonly canvasTopOffset = computed(() => this.canvas()?.getBoundingClientRect().top ?? 0);
	protected readonly rawCanvasWidth = this.screenService.screenWidth.asReadonly();
	protected readonly rawCanvasHeight = computed(() => this.screenService.screenHeight() - this.canvasTopOffset());

	private readonly mousePosition = computed<[ number, number ]>(() => {
		const [ x, y ] = this.screenService.mousePosition();
		return [ x * this.pixelDensity(), (y - this.canvasTopOffset()) * this.pixelDensity() ];
	});

	private readonly renderInterval = signal(10);
	private readonly onRender = this.animationFrameService.onAnimationInterval(this.renderInterval);

	protected canvasElements = Array<CanvasElement>();

	public constructor() {
		super();

		effect(() => this.manageElements());
		effect(() => this.onRenderFrame());
	}

	public override initialize(canvas: HTMLCanvasElement): void {
		super.initialize(canvas);
	}

	private manageElements(): void {
		const movingBackgroundAmount = this.backgroundService.amount();
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();

		const element = Circle.random(canvasWidth, canvasHeight);

		this.canvasElements = element.filterInBoundaryElements(this.canvasElements as Circle[], canvasWidth, canvasHeight);
		this.canvasElements = element.calibrateElements(this.canvasElements as Circle[], movingBackgroundAmount, canvasWidth, canvasHeight);
	}

	private onRenderFrame(): void {
		this.onRender();

		if (this.backgroundService.moving()) {
			this.renderFrame();
		}
	}

	/**
	 * TODO: Performance rendering changes:
	 *  1. partial frame rendering:
	 *   a.    modifiedElements: CanvasElement[]
	 *  2. contextual frame rate:
	 *   a.    separate animations from rendering steps
	 *   b.    ideal render timing by canvasElement spec: ie 100fps vs 8fps
	 *
	 * TODO: background configuration:
	 *  1. background types
	 *  2. background type selection in the background dialog.
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
}
