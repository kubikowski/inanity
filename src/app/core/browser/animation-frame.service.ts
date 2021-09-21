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

	@Observed() private onAnimationFrame: DOMHighResTimeStamp;
	@Observed() private fps = 0;

	public readonly onAnimationFrame$: Observable<DOMHighResTimeStamp>;
	public readonly fps$: Observable<number>;

	constructor() {
		this.requestAnimationFrame(performance.now());
		this.calculateFps();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		AnimationFrameService.enabled = false;
	}

	private requestAnimationFrame(time: DOMHighResTimeStamp): void {
		this.onAnimationFrame = time;

		if (AnimationFrameService.enabled) {
			requestAnimationFrame(this.requestAnimationFrame.bind(this));
		}
	}

	private calculateFps(): void {
		this.subscriptions.sink = this.onAnimationFrame$
			.pipe(
				scan((acc, timestamp) => [ ...acc.slice((acc.length <= AnimationFrameService.frameAverage) ? 0 : 1), timestamp ], []),
				map(timestamps => timestamps[timestamps.length - 1] - timestamps[0]),
				map(msBetweenTimestamps => 1000 * AnimationFrameService.frameAverage / msBetweenTimestamps),
			).subscribe(fps => this.fps = fps);
	}
}
