import { computed, inject, Injectable, OnDestroy, signal, untracked } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
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

	protected readonly rawCanvasWidth$ = toObservable(this.rawCanvasWidth);
	protected readonly rawCanvasHeight$ = toObservable(this.rawCanvasHeight);
	protected readonly pixelDensity$ = toObservable(this.pixelDensity);
	protected readonly canvasWidth$ = toObservable(this.canvasWidth);
	protected readonly canvasHeight$ = toObservable(this.canvasHeight);

	protected canvasElements = Array<CanvasElement>();


	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: HTMLCanvasElement): void {
		this.canvas.set(canvas);

		this.subscriptions.unsubscribe();
		this.initializeCanvasSize();
	}

	protected initializeCanvasSize(): void {
		this.subscriptions.sink = this.pixelDensity$
			.subscribe(pixelDensity => {
				const context = untracked(this.context);

				if (context !== null) {
					context.scale(pixelDensity, pixelDensity);
				}
			});

		this.subscriptions.sink = combineLatest([ this.rawCanvasWidth$, this.pixelDensity$ ])
			.subscribe(([ rawCanvasWidth, pixelDensity ]) => {
				const canvas = untracked(this.canvas);
				const canvasWidth = Math.floor(rawCanvasWidth * pixelDensity);

				if (canvas !== null) {
					canvas.style.width = `${ rawCanvasWidth }px`;
					canvas.width = canvasWidth;
				}
			});

		this.subscriptions.sink = combineLatest([ this.rawCanvasHeight$, this.pixelDensity$ ])
			.subscribe(([ rawCanvasHeight, pixelDensity ]) => {
				const canvas = untracked(this.canvas);
				const canvasHeight = Math.floor(rawCanvasHeight * pixelDensity);

				if (canvas !== null) {
					canvas.style.height = `${ canvasHeight }px`;
					canvas.height = canvasHeight;
				}
			});
	}
}
