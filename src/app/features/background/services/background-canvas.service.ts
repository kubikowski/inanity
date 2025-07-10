import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { union } from 'set-utilities';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { stateful } from 'src/app/core/functions/signal/stateful.function';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Pixel } from 'src/app/features/background/models/pixel.model';
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

	private readonly referenceElement = signal<CanvasElement>(Pixel.reference());
	private readonly canvasElements = stateful(<readonly CanvasElement[]>[], canvasElements => {
		const movingBackgroundAmount = this.backgroundService.amount();
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();
		const reference = this.referenceElement();

		return reference.validateElements(canvasElements, movingBackgroundAmount, canvasWidth, canvasHeight);
	});

	private readonly renderedElements = signal<ReadonlySet<CanvasElement>>(new Set());

	private readonly renderInterval = computed(() => this.referenceElement().renderInterval);
	private readonly paintInterval = computed(() => this.referenceElement().paintInterval);

	private readonly onRender = this.animationFrameService.onAnimationInterval(this.renderInterval);
	private readonly onPaint = this.animationFrameService.onAnimationInterval(this.paintInterval);

	public constructor() {
		super();

		// TODO: replace renderedElements with a linked signal
		effect(() => this.renderedElements.set(new Set(this.canvasElements())), allowWrites);

		effect(() => this.onRenderFrame(), allowWrites);
		effect(() => this.onPaintFrame(), allowWrites);
	}

	private onRenderFrame(): void {
		this.onRender();

		if (this.backgroundService.moving()) untracked(() => {
			this.renderFrame();
		});
	}

	private onPaintFrame(): void {
		this.onPaint();

		if (this.backgroundService.moving()) untracked(() => {
			this.paintFrame();
		});
	}

	/**
	 * TODO: background configuration:
	 *  1. background types
	 *  2. background type selection in the background dialog.
	 */
	private renderFrame(): void {
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();
		const mousePosition = this.mousePosition();
		const reference = this.referenceElement();
		const canvasElements = this.canvasElements();

		const renderedElements = reference.renderElements(canvasElements, canvasWidth, canvasHeight, mousePosition);
		this.renderedElements.set(union(this.renderedElements(), new Set(renderedElements)));
	}

	private paintFrame(): void {
		const context = this.context();
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();
		const colorPalette = this.colorsService.palette();
		const reference = this.referenceElement();
		const renderedElements = this.renderedElements();

		if (context !== null) {
			reference.paintElements(renderedElements, context, canvasWidth, canvasHeight, colorPalette);
			this.renderedElements.set(new Set());
		}
	}
}
