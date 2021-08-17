import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { map, scan } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private static enabled = true;
	private static frameAverage = 60;

	@Observed() private timeStamp: DOMHighResTimeStamp;
	private readonly timeStamp$: Observable<DOMHighResTimeStamp>;

	@Observed() private fps = 0;
	public readonly fps$: Observable<number>;

	constructor() {
		this.onAnimationFrame(performance.now());

		this.subscriptions.sink = this.timeStamp$
			.pipe(
				scan((acc, timestamp) => [ ...acc.slice(acc.length <= AnimationFrameService.frameAverage ? 0 : 1), timestamp ], []),
				map(timestamps => timestamps[timestamps.length - 1] - timestamps[0]),
				map(msBetweenTimestamps => 1000 * AnimationFrameService.frameAverage / msBetweenTimestamps),
			).subscribe(fps => this.fps = fps);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		AnimationFrameService.enabled = false;
	}

	private onAnimationFrame(time: number): void {
		this.timeStamp = time;

		if (AnimationFrameService.enabled) {
			requestAnimationFrame(this.onAnimationFrame.bind(this));
		}
	}
}
