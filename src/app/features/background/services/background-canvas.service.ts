import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { stateful } from 'src/app/core/functions/signal/stateful.function';
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

	private readonly referenceElement = signal<CanvasElement>(Circle.reference());
	private readonly canvasElements = stateful(<readonly CanvasElement[]>[], canvasElements => {
		const movingBackgroundAmount = this.backgroundService.amount();
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();
		const reference = this.referenceElement();

		return reference.validateElements(canvasElements, movingBackgroundAmount, canvasWidth, canvasHeight);
	});

	private readonly animationInterval = computed(() => this.referenceElement().animationInterval);
	private readonly renderInterval = computed(() => this.referenceElement().renderInterval);

	private readonly onAnimation = this.animationFrameService.onAnimationInterval(this.animationInterval);
	private readonly onRender = this.animationFrameService.onAnimationInterval(this.renderInterval);

	public constructor() {
		super();

		effect(() => this.onAnimationFrame());
		effect(() => this.onRenderFrame());
	}

	private onAnimationFrame(): void {
		this.onAnimation();

		if (this.backgroundService.moving()) {
			this.animateFrame();
		}
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
	private animateFrame(): void {
		const canvasWidth = untracked(this.canvasWidth);
		const canvasHeight = untracked(this.canvasHeight);
		const mousePosition = untracked(this.mousePosition);
		const reference = untracked(this.referenceElement);
		const canvasElements = untracked(this.canvasElements);

		reference.animateElements(canvasElements, canvasWidth, canvasHeight, mousePosition);
	}

	private renderFrame(): void {
		const context = untracked(this.context);
		const canvasWidth = untracked(this.canvasWidth);
		const canvasHeight = untracked(this.canvasHeight);
		const colorPalette = untracked(this.colorsService.palette);
		const reference = untracked(this.referenceElement);
		const canvasElements = untracked(this.canvasElements);

		if (context !== null) {
			reference.renderElements(canvasElements, context, canvasWidth, canvasHeight, colorPalette);
		}
	}
}
