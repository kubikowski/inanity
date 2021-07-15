import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class FpsService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private static enabled = true;

	@Observed() private timeStamp: DOMHighResTimeStamp;
	private readonly timeStamp$: Observable<DOMHighResTimeStamp>;

	@Observed() private fps = 0;
	public readonly fps$: Observable<number>;

	constructor() {
		this.onAnimationFrame(performance.now());

		this.subscriptions.sink = this.timeStamp$
			.pipe(
				pairwise(),
				map(([ previous, current ]) => current - previous),
				map(msBetweenTimestamps => 1000 / msBetweenTimestamps),
			).subscribe(fps => this.fps = fps);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		FpsService.enabled = false;
	}

	private onAnimationFrame(time: number): void {
		this.timeStamp = time;

		if (FpsService.enabled) {
			requestAnimationFrame(this.onAnimationFrame.bind(this));
		}
	}
}
