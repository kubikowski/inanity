import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BackgroundCanvasService } from 'src/app/navigation/background/services/background-canvas.service';
import { FloatUpAnimationState } from 'src/app/shared/animations/float-up.animation';
import { MovingBackgroundIcon } from 'src/app/shared/moving-background/moving-background-icon.model';
import { FpsService } from 'src/app/shared/screen-detector/fps.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		BackgroundCanvasService,
	],
})
export class BackgroundComponent implements AfterViewInit {
	public readonly screenWidth$: Observable<number>;
	public readonly screenHeight$: Observable<number>;
	public readonly mousePosition$: Observable<[ number, number ]>;
	public readonly fps$: Observable<number>;

	public readonly renderedIcons$: Observable<ReadonlyArray<MovingBackgroundIcon>>;
	public readonly floating = FloatUpAnimationState.FLOATING;

	@ViewChild('canvas', { static: true })
	private readonly canvas: ElementRef<HTMLCanvasElement>;

	constructor(
		private readonly backgroundCanvasService: BackgroundCanvasService,
		private readonly fpsService: FpsService,
		private readonly screenDetectorService: ScreenDetectorService,
	) {
		this.screenWidth$ = this.screenDetectorService.screenWidth$;
		this.screenHeight$ = this.screenDetectorService.screenHeight$;
		this.mousePosition$ = this.screenDetectorService.mousePosition$;

		this.fps$ = this.fpsService.fps$
			.pipe(map(fps => Math.floor(fps)), distinctUntilChanged());
	}

	ngAfterViewInit(): void {
		this.backgroundCanvasService.initialize(this.canvas);
	}

	// private initializeRectangles(maxWidth: number, maxHeight: number): void {
	// 	const maxSize = Math.min(maxWidth, maxHeight);
	//
	// 	for (let size = 1; size < maxSize; size = size * 2) {
	// 		this.backgroundCanvasService.addRectangle(size);
	// 	}
	// }

	// private initializeLineSegments(maxWidth: number, maxHeight: number): void {
	// 	const maxSize = Math.min(maxWidth, maxHeight);
	//
	// 	const startingX = Math.floor(Math.random() * maxWidth);
	// 	const startingY = Math.floor(Math.random() * maxHeight);
	// 	this.backgroundCanvasService.beginLineSegment(startingX, startingY);
	//
	// 	for (let size = 1; size < maxSize; size = size * 2) {
	// 		const x = Math.floor(Math.random() * maxWidth / size);
	// 		const y = Math.floor(Math.random() * maxHeight / size);
	//
	// 		this.backgroundCanvasService.addLineSegment(x, y);
	// 	}
	// }

	// private initializeCircles(): void {
	// 	this.backgroundCanvasService.manageCircleAmount(100);
	// }

	public trackIconBy(index: number, renderedIcon: MovingBackgroundIcon): number {
		return renderedIcon?.id ?? null;
	}
}
