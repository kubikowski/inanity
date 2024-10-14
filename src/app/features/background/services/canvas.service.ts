import { computed, effect, inject, Injectable, OnDestroy, signal, untracked } from '@angular/core';
import { ScreenDetectorService } from 'src/app/core/browser/screen-detector.service';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { SubSink } from 'subsink';

@Injectable()
export abstract class CanvasService implements OnDestroy {
	protected readonly screenDetectorService = inject(ScreenDetectorService);
	protected readonly subscriptions = new SubSink();

	protected readonly canvas = signal<HTMLCanvasElement | null>(null);
	protected readonly context = computed(() => this.canvas()?.getContext('2d') ?? null);

	protected readonly canvasTopOffset = computed(() => this.canvas()?.getBoundingClientRect().top ?? 0);
	protected readonly rawCanvasWidth = this.screenDetectorService.screenWidth.asReadonly();
	protected readonly rawCanvasHeight = computed(() => this.screenDetectorService.screenHeight() - this.canvasTopOffset());

	protected readonly pixelDensity = this.screenDetectorService.pixelDensity.asReadonly();
	protected readonly canvasWidth = computed(() => Math.floor(this.rawCanvasWidth() * this.pixelDensity()));
	protected readonly canvasHeight = computed(() => Math.floor(this.rawCanvasHeight() * this.pixelDensity()));

	protected canvasElements = Array<CanvasElement>();

	protected constructor() {
		effect(() => {
			const context = this.context();

			if (context !== null) {
				context.scale(this.pixelDensity(), this.pixelDensity());
			}
		});

		effect(() => {
			const canvas = untracked(this.canvas);

			if (canvas !== null) {
				canvas.style.height = `${ this.rawCanvasHeight() }px`;
				canvas.style.width = `${ this.rawCanvasWidth() }px`;
				canvas.width = this.canvasWidth();
				canvas.height = this.canvasHeight();
			}
		});
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: HTMLCanvasElement): void {
		this.canvas.set(canvas);
	}
}
