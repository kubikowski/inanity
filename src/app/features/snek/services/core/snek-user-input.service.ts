import { effect, inject, Injectable, OnDestroy, Renderer2, signal, untracked } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekUserInputService implements OnDestroy {
	private readonly snekStateService = inject(SnekStateService);

	private readonly listenerUnsubscribeCallback = inject(Renderer2)
		.listen('document', 'keydown', this.handleKeyDown.bind(this));

	private readonly commandQueue = signal(<readonly SnekDirection[]>[]);

	public constructor() {
		effect(() => {
			this.changeDirection(this.commandQueue());
		}, allowWrites);

		effect(() => {
			this.snekStateService.gameClock();
			this.processNextCommand();
		}, allowWrites);

		effect(() => {
			this.snekStateService.gameOver();
			this.resetCommandQueue();
		}, allowWrites);
	}

	public ngOnDestroy(): void {
		this.listenerUnsubscribeCallback();
	}

	private handleKeyDown(keyboardEvent: KeyboardEvent): void {
		if (untracked(this.snekStateService.paused)) {
			return;
		}

		switch (keyboardEvent.key) {
			case 'w':
			case 'ArrowUp':
				this.enterCommand(SnekDirection.UP);
				break;
			case 's':
			case 'ArrowDown':
				this.enterCommand(SnekDirection.DOWN);
				break;
			case 'a':
			case 'ArrowLeft':
				this.enterCommand(SnekDirection.LEFT);
				break;
			case 'd':
			case 'ArrowRight':
				this.enterCommand(SnekDirection.RIGHT);
				break;
		}
	}

	public handleJoystick(event: JoystickOutputData): void {
		if (untracked(this.snekStateService.paused)) {
			return;
		}

		switch (event.direction?.angle) {
			case 'up':
				this.enterCommand(SnekDirection.UP);
				break;
			case 'down':
				this.enterCommand(SnekDirection.DOWN);
				break;
			case 'left':
				this.enterCommand(SnekDirection.LEFT);
				break;
			case 'right':
				this.enterCommand(SnekDirection.RIGHT);
				break;
		}
	}

	private enterCommand(direction: SnekDirection): void {
		switch (untracked(this.commandQueue).length) {
			case 0:
				this.enterPrimaryCommand(direction);
				break;
			case 1:
				this.enterSecondaryCommand(direction);
				break;
		}
	}

	private enterPrimaryCommand(direction: SnekDirection): void {
		const playing = untracked(this.snekStateService.playing);
		const currentDirection = untracked(this.snekStateService.directionInput) ?? SnekDirection.RIGHT;

		if (SnekDirectionUtil.isValidChange(currentDirection, direction) || !playing) {
			this.commandQueue.set([ direction ]);
		}
	}

	private enterSecondaryCommand(direction: SnekDirection): void {
		const currentDirection = untracked(this.snekStateService.directionInput) ?? SnekDirection.RIGHT;
		const nextDirection = untracked(this.commandQueue)[0] as SnekDirection;

		if (SnekDirectionUtil.isValidChange(nextDirection, direction)) {
			this.commandQueue.set([ nextDirection, direction ]);
		} else if (SnekDirectionUtil.isValidChange(currentDirection, direction)) {
			this.commandQueue.set([ direction ]);
		}
	}

	private processNextCommand(): void {
		this.commandQueue.set(untracked(this.commandQueue).slice(1));
	}

	private resetCommandQueue(): void {
		this.commandQueue.set([]);
	}

	private changeDirection(commandQueue: readonly SnekDirection[]): void {
		if (commandQueue.length > 0) {
			const direction = commandQueue[0] as SnekDirection;
			this.snekStateService.directionInput.set(direction);
		}
	}
}
