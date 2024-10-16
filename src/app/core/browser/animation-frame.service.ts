import { computed, Injectable, OnDestroy, signal, untracked } from '@angular/core';
import { computedStateful } from 'src/app/core/functions/signal/computed-stateful.function';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {

	private static enabled = true;
	private static frameAverage = 601;

	public readonly onAnimationFrame = signal<DOMHighResTimeStamp>(performance.now());

	private readonly timestamps = computedStateful([ untracked(this.onAnimationFrame) ], timestamps =>
		[ ...timestamps.slice((timestamps.length <= AnimationFrameService.frameAverage) ? 0 : 1), this.onAnimationFrame() ]);

	public readonly fps = computed(() => {
		const timestamps = this.timestamps();
		const msBetweenTimestamps = (timestamps?.[timestamps?.length - 1] ?? 0) - (timestamps?.[0] ?? 0);
		return Math.floor(1000 * (timestamps.length - 1) / msBetweenTimestamps);
	});

	public constructor() {
		AnimationFrameService.enabled = true;
		this.requestAnimationFrame(performance.now());
	}

	public ngOnDestroy(): void {
		AnimationFrameService.enabled = false;
	}

	private requestAnimationFrame(timestamp: DOMHighResTimeStamp): void {
		this.onAnimationFrame.set(timestamp);

		if (AnimationFrameService.enabled) {
			requestAnimationFrame(this.requestAnimationFrame.bind(this));
		}
	}
}
