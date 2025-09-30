import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { union } from 'set-utilities';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { stateful } from 'src/app/core/functions/signal/stateful.function';
import { HandIconUtil } from 'src/app/core/svg/hand-icon.enum';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { BackgroundTypeUtil } from 'src/app/features/background/models/background-type.enum';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { Grain } from 'src/app/features/background/models/grain.model';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { CanvasService } from 'src/app/features/canvas/canvas.service';

@Injectable()
export class BackgroundCanvasService extends CanvasService {
	protected readonly backgroundService = inject(BackgroundService);
	protected readonly animationFrameService = inject(AnimationFrameService);
	protected readonly svgIconService = inject(SvgIconService);

	protected readonly rawCanvasWidth = this.screenService.screenWidth.asReadonly();
	protected readonly rawCanvasHeight = this.screenService.screenHeight.asReadonly();

	protected readonly mousePosition = computed<[ number, number ]>(() => {
		const [ x, y ] = this.screenService.mousePosition();
		return [ x * this.pixelDensity(), y * this.pixelDensity() ];
	});

	private readonly svgOverlay = toSignal(this.svgIconService.getIcon(HandIconUtil.random(), HandIconUtil.namespace));

	protected readonly calibration = this.backgroundService.amount.asReadonly();
	protected readonly maxCalibration = signal(BackgroundService.maxCalibration).asReadonly();

	protected readonly backgroundType = this.backgroundService.type;
	private readonly referenceElement = computed(() => BackgroundTypeUtil.getReference(this.backgroundType()));
	private readonly canvasElements = stateful(<readonly CanvasElement[]>[], canvasElements => {
		const canvasWidth = this.canvasWidth();
		const canvasHeight = this.canvasHeight();
		const calibration = this.calibration();
		const maxCalibration = this.maxCalibration();
		const reference = this.referenceElement();

		return reference.validateElements(canvasElements, canvasWidth, canvasHeight, calibration, maxCalibration);
	});

	private readonly renderedElements = signal<ReadonlySet<CanvasElement>>(new Set());

	private readonly renderInterval = computed(() => this.referenceElement().renderInterval);
	private readonly paintInterval = computed(() => this.referenceElement().paintInterval);

	private readonly onRender = this.animationFrameService.onAnimationInterval(this.renderInterval);
	private readonly onPaint = this.animationFrameService.onAnimationInterval(this.paintInterval);

	public constructor() {
		super();

		effect(() => this.initializeSvgOverlay());

		// TODO: replace renderedElements with a linked signal
		effect(() => this.renderedElements.set(new Set(this.canvasElements())));

		effect(() => this.onRenderFrame());
		effect(() => this.onPaintFrame());
	}

	private initializeSvgOverlay(): void {
		const svgElement = this.svgOverlay() ?? null;
		const pathElement = svgElement?.firstElementChild?.firstElementChild as SVGPathElement ?? null;

		Grain.svgOverlay.set(pathElement);
	}

	private onRenderFrame(): void {
		this.onRender();
		untracked(() => this.renderFrame());
	}

	private onPaintFrame(): void {
		this.onPaint();
		untracked(() => this.paintFrame());
	}

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

		if (context !== null && renderedElements.size > 0) {
			reference.paintElements(renderedElements, context, canvasWidth, canvasHeight, colorPalette);
			this.renderedElements.set(new Set());
		}
	}
}
