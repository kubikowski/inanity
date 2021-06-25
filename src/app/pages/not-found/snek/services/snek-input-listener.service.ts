import { Injectable, Renderer2 } from '@angular/core';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekService } from 'src/app/pages/not-found/snek/services/snek.service';

@Injectable()
export class SnekInputListenerService {
	constructor(
		private renderer: Renderer2,
		private snekService: SnekService,
	) {
		this.renderer.listen('document', 'keydown', this.handleKeyDown.bind(this));
	}

	private handleKeyDown(keyboardEvent: KeyboardEvent): void {
		if (this.snekService.paused) {
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

	private changeDirection(direction: SnekDirection): void {
		this.snekService.play();
		this.snekService.snekGame.snek.direction = direction;
	}
}
