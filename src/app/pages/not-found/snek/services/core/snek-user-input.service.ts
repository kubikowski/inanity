import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/direction/snek-direction.enum';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';

@Injectable()
export class SnekUserInputService implements OnDestroy {
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

	public handleJoystick(event: JoystickOutputData): void {
		if (this.snekStateService.paused) {
			return;
		}

		switch (event.direction?.angle) {
			case 'up':
				this.changeDirection(SnekDirection.UP);
				break;
			case 'down':
				this.changeDirection(SnekDirection.DOWN);
				break;
			case 'left':
				this.changeDirection(SnekDirection.LEFT);
				break;
			case 'right':
				this.changeDirection(SnekDirection.RIGHT);
				break;
		}
	}

	private changeDirection(direction: SnekDirection): void {
		this.snekStateService.play();
		this.snekStateService.snekGame.snek.direction = direction;
	}
}
