import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, scan } from 'rxjs/operators';
import { Observed } from 'rxjs-observed-decorator';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private static enabled = true;
	private static frameAverage = 60;

	@Observed() private onAnimationFrame: DOMHighResTimeStamp = performance.now();
	@Observed() private fps = 0;

	public readonly onAnimationFrame$!: Observable<DOMHighResTimeStamp>;
	public readonly fps$!: Observable<number>;

	public constructor() {
		this.requestAnimationFrame(performance.now());
		this.calculateFps();
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		AnimationFrameService.enabled = false;
	}

	private requestAnimationFrame(timestamp: DOMHighResTimeStamp): void {
		this.onAnimationFrame = timestamp;

		if (AnimationFrameService.enabled) {
			requestAnimationFrame(this.requestAnimationFrame.bind(this));
		}
	}

	private calculateFps(): void {
		this.subscriptions.sink = this.onAnimationFrame$
			.pipe(
				scan((acc, timestamp) => [ ...acc.slice((acc.length <= AnimationFrameService.frameAverage) ? 0 : 1), timestamp ], <number[]>[]),
				map(timestamps => (timestamps?.[timestamps?.length - 1] ?? 0) - (timestamps?.[0] ?? 0)),
				map(msBetweenTimestamps => 1000 * AnimationFrameService.frameAverage / msBetweenTimestamps),
				map(fps => Math.floor(fps)),
				distinctUntilChanged(),
			).subscribe(fps => this.fps = fps);
	}
}
