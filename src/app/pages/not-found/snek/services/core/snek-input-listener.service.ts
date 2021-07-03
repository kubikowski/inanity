import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/direction/snek-direction.enum';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import Hammer from 'hammerjs';

@Injectable()
export class SnekInputListenerService implements OnDestroy {
	private readonly listenerUnsubscribeCallback: () => void;

	constructor(
		private readonly renderer: Renderer2,
		private readonly snekStateService: SnekStateService,
	) {
		this.listenerUnsubscribeCallback =
			this.renderer.listen('document', 'keydown', this.handleKeyDown.bind(this));
	}

	ngOnDestroy(): void {
		this.listenerUnsubscribeCallback();
	}

	private handleKeyDown(keyboardEvent: KeyboardEvent): void {
		if (this.snekStateService.paused) {
			return;
		}

		switch (keyboardEvent.key) {
			case 'w':
			case 'ArrowUp':
				this.changeDirection(SnekDirection.UP);
				break;
			case 's':
			case 'ArrowDown':
				this.changeDirection(SnekDirection.DOWN);
				break;
			case 'a':
			case 'ArrowLeft':
				this.changeDirection(SnekDirection.LEFT);
				break;
			case 'd':
			case 'ArrowRight':
				this.changeDirection(SnekDirection.RIGHT);
				break;
		}
	}

	public handleSwipe(swipeEvent: HammerInput): void {
		if (this.snekStateService.paused) {
			return;
		}

		switch (swipeEvent.direction) {
			case Hammer.DIRECTION_UP:
				this.changeDirection(SnekDirection.UP);
				break;
			case Hammer.DIRECTION_DOWN:
				this.changeDirection(SnekDirection.DOWN);
				break;
			case Hammer.DIRECTION_LEFT:
				this.changeDirection(SnekDirection.LEFT);
				break;
			case Hammer.DIRECTION_RIGHT:
				this.changeDirection(SnekDirection.RIGHT);
				break;
		}
	}

	private changeDirection(direction: SnekDirection): void {
		this.snekStateService.play();
		this.snekStateService.snekGame.snek.direction = direction;
	}
}
