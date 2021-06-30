import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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

	public readonly snekWidth$: Observable<number>;
	public readonly snekHeight$: Observable<number>;

	constructor(
		private readonly screenDetectorService: ScreenDetectorService,
	) {
		this.initializeSnekWidth();
		this.initializeSnekHeight();

		this.initializeInadequateResolutionHandler();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private initializeSnekWidth(): void {
		this.subscriptions.sink = this.screenDetectorService.screenWidth$
			.pipe(map(screenWidth => this.getSnekWidth(screenWidth)))
			.subscribe(snekWidth => this.snekWidth = snekWidth);
	}

	private initializeSnekHeight(): void {
		this.subscriptions.sink = this.screenDetectorService.screenHeight$
			.pipe(map(screenHeight => this.getSnekHeight(screenHeight)))
			.subscribe(snekHeight => this.snekHeight = snekHeight);
	}

	private initializeInadequateResolutionHandler(): void {
		this.subscriptions.sink = combineLatest([ this.snekWidth$, this.snekHeight$ ])
			.pipe(filter(this.filterInadequateResolution.bind(this)))
			.subscribe(this.warnInadequateResolution.bind(this));
	}

	private filterInadequateResolution([ snekWidth, snekHeight ]: [ number, number ]): boolean {
		return snekWidth < this.optimalSnekWidth
			|| snekHeight < this.optimalSnekHeight;
	}

	private warnInadequateResolution([ snekWidth, snekHeight ]: [ number, number ]): void {
		console.warn(
			`current res: (${ snekWidth }, ${ snekHeight }), area: ${ snekWidth * snekHeight } \n` +
			`optimal res: (${ this.optimalSnekWidth }, ${ this.optimalSnekHeight }), area: ${ this.optimalSnekWidth * this.optimalSnekHeight }`
		);
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
