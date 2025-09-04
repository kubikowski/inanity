import { computed, Injectable, OnDestroy, Signal, signal, untracked } from '@angular/core';
import { stateful } from 'src/app/core/functions/signal/stateful.function';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {
	private static enabled = true;
	private static frameAverage = 601;

	private readonly onAnimationFrame = signal<DOMHighResTimeStamp>(performance.now());

	private readonly timestamps = stateful([ untracked(this.onAnimationFrame) ], timestamps =>
		[ ...timestamps.slice((timestamps.length <= AnimationFrameService.frameAverage) ? 0 : 1), this.onAnimationFrame() ]);

	public readonly fps = computed(() => {
		const timestamps = this.timestamps();
		const msBetweenTimestamps = (timestamps[timestamps.length - 1] ?? 0) - (timestamps[0] ?? 0);
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

	public onAnimationInterval(interval: Signal<number>): Signal<DOMHighResTimeStamp> {
		return stateful(untracked(this.onAnimationFrame), lastFrame => {
			if (interval() === 0) return lastFrame;
			const currentFrame = this.onAnimationFrame();

			return (currentFrame - lastFrame >= interval())
				? currentFrame
				: lastFrame;
		});
	}
}
