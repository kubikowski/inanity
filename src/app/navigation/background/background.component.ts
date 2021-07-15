import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilKeyChanged, first, map } from 'rxjs/operators';
import { FloatUpAnimation, FloatUpAnimationState } from 'src/app/shared/animations/float-up.animation';
import { MovingBackgroundIcon } from 'src/app/shared/moving-background/moving-background-icon.model';
import { MovingBackgroundService } from 'src/app/shared/moving-background/moving-background.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ FloatUpAnimation ],
})
export class BackgroundComponent implements AfterViewInit {
	public readonly screenWidth$: Observable<number>;
	public readonly screenHeight$: Observable<number>;

	public readonly renderedIcons$: Observable<ReadonlyArray<MovingBackgroundIcon>>;
	public readonly floating = FloatUpAnimationState.FLOATING;

	@ViewChild('canvas', { static: true })
	private readonly canvas: ElementRef<HTMLCanvasElement>;

	private context: CanvasRenderingContext2D;

	constructor(
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly movingBackgroundService: MovingBackgroundService,
	) {
		this.screenWidth$ = this.screenDetectorService.screenWidth$;
		this.screenHeight$ = this.screenDetectorService.screenHeight$;

		this.renderedIcons$ = this.movingBackgroundService.renderedIcons$
			.pipe(
				distinctUntilKeyChanged('size'),
				map(iconMap => Array.from(iconMap.values())),
			);
	}

	ngAfterViewInit(): void {
		this.context = this.canvas.nativeElement.getContext('2d');

		this.initializeRects();
		this.setContextStyles();
	}

	private initializeRects(): void {
		combineLatest([ this.screenWidth$, this.screenHeight$ ])
			.pipe(first())
			.subscribe(([ maxWidth, maxHeight ]) => {
				const maxSize = Math.min(maxWidth, maxHeight);

				for (let size = 1; size < maxSize; size = size * 2) {
					this.fillRect(size);
				}
			});
	}

	private fillRect(size: number): void {
		this.context.fillRect(size, size, size, size);
	}

	private setContextStyles(): void {
		this.context.fillStyle = 'var(--default-background-color)';
		this.context.strokeStyle = 'var(--default-background-color)';
	}

	public trackIconBy(index: number, renderedIcon: MovingBackgroundIcon): number {
		return renderedIcon?.id ?? null;
	}
}
