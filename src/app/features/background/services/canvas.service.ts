import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Observed } from 'src/app/core/decorators/observed.decorator';
import { ScreenDetectorService } from 'src/app/core/screen/screen-detector.service';
import { CanvasElement } from 'src/app/features/background/models/canvas-element.model';
import { SubSink } from 'subsink';

@Injectable()
export abstract class CanvasService implements OnDestroy {
	protected readonly subscriptions = new SubSink();

	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;

	@Observed() protected rawCanvasWidth = 0;
	@Observed() protected rawCanvasHeight = 0;
	@Observed() protected canvasWidth = 0;
	@Observed() protected canvasHeight = 0;
	@Observed() protected pixelDensity = 1;

	protected readonly rawCanvasWidth$: Observable<number>;
	protected readonly rawCanvasHeight$: Observable<number>;
	protected readonly canvasWidth$: Observable<number>;
	protected readonly canvasHeight$: Observable<number>;
	protected readonly pixelDensity$: Observable<number>;

	protected canvasElements = Array<CanvasElement>();

	protected constructor(
		protected readonly screenDetectorService: ScreenDetectorService,
	) {
		this.subscriptions.sink = this.screenDetectorService.pixelDensity$
			.subscribe(pixelDensity => this.pixelDensity = pixelDensity);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: HTMLCanvasElement): void {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.initializeCanvasSize();
	}

	protected initializeCanvasSize(): void {
		this.subscriptions.sink = this.pixelDensity$
			.subscribe(pixelDensity => this.context.scale(pixelDensity, pixelDensity));

		this.subscriptions.sink = combineLatest([ this.rawCanvasWidth$, this.pixelDensity$ ])
			.pipe(
				tap(([ rawCanvasWidth ]) => this.canvas.style.width = `${ rawCanvasWidth }px`),
				map(([ rawCanvasWidth, pixelDensity ]) => Math.floor(rawCanvasWidth * pixelDensity)),
				tap(canvasWidth => this.canvasWidth = canvasWidth),
			).subscribe(canvasWidth => this.canvas.width = canvasWidth);

		this.subscriptions.sink = combineLatest([ this.rawCanvasHeight$, this.pixelDensity$ ])
			.pipe(
				tap(([ rawCanvasHeight ]) => this.canvas.style.height = `${ rawCanvasHeight }px`),
				map(([ rawCanvasHeight, pixelDensity ]) => Math.floor(rawCanvasHeight * pixelDensity)),
				tap(canvasHeight => this.canvasHeight = canvasHeight),
			).subscribe(canvasHeight => this.canvas.height = canvasHeight);
	}
}
