import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import { computePrevious } from 'src/app/core/functions/signal/compute-previous.function';

@Injectable({ providedIn: 'root' })
export class AnimationFrameService implements OnDestroy {

	private static enabled = true;
	private static frameAverage = 120;

	public readonly onAnimationFrame = signal<DOMHighResTimeStamp>(performance.now());

	private readonly timestamps = computePrevious(this.onAnimationFrame, AnimationFrameService.frameAverage);

	public readonly fps = computed(() => {
		const timestamps = this.timestamps();
		const msBetweenTimestamps = (timestamps?.[timestamps?.length - 1] ?? 0) - (timestamps?.[0] ?? 0);
		return Math.floor(1000 * AnimationFrameService.frameAverage / msBetweenTimestamps);
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
