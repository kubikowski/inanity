import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekResolutionService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private readonly optimalSnekWidth = 35;
	private readonly optimalSnekHeight = 25;

	@Observed() private snekWidth: number;
	@Observed() private snekHeight: number;
	@Observed({ type: 'subject' }) private resolutionChange: [ number, number ] = null;

	public readonly snekWidth$: Observable<number>;
	public readonly snekHeight$: Observable<number>;
	public readonly resolutionChange$: Observable<[ number, number ]>;

	constructor(
		private readonly screenDetectorService: ScreenDetectorService,
	) {
		this.initializeSnekWidth();
		this.initializeSnekHeight();
		this.initializeResolutionChange();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeSnekWidth(): void {
		this.subscriptions.sink = this.screenDetectorService.screenWidth$
			.pipe(
				map(screenWidth => this.getSnekWidth(screenWidth)),
				distinctUntilChanged(),
			).subscribe(snekWidth => this.snekWidth = snekWidth);
	}

	private initializeSnekHeight(): void {
		this.subscriptions.sink = this.screenDetectorService.screenHeight$
			.pipe(
				map(screenHeight => this.getSnekHeight(screenHeight)),
				distinctUntilChanged(),
			).subscribe(snekHeight => this.snekHeight = snekHeight);
	}

	private initializeResolutionChange(): void {
		this.subscriptions.sink = combineLatest([ this.snekWidth$, this.snekHeight$ ])
			.subscribe(([ snekWidth, snekHeight ]) => this.resolutionChange = [ snekWidth, snekHeight ]);
	}

	private getSnekWidth(screenWidth: number): number {
		const screenDependentSnekWidth = Math.floor(screenWidth / 20) - 3;

		return Math.min(screenDependentSnekWidth, this.optimalSnekWidth);
	}

	private getSnekHeight(screenHeight: number): number {
		const screenDependentSnekHeight = Math.floor(screenHeight / 20) - 12;

		return Math.min(screenDependentSnekHeight, this.optimalSnekHeight);
	}
}
