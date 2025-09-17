import { effect, inject, Injectable, OnDestroy, Renderer2, signal, untracked } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { difference, union } from 'set-utilities';
import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekUserInputService implements OnDestroy {
	private readonly snekStateService = inject(SnekStateService);
	private readonly renderer = inject(Renderer2);

	private readonly keydownUnsubscribeCallback = this.renderer
		.listen('document', 'keydown', this.handleKeydown.bind(this));

	private readonly keyupUnsubscribeCallback = this.renderer
		.listen('document', 'keyup', this.handleKeyup.bind(this));

	private readonly keydownQueue = signal(<readonly SnekDirection[]>[]);
	private readonly commandQueue = signal(<readonly SnekDirection[]>[]);

	public constructor() {
		effect(() => this.changeDirection(this.commandQueue()));

		effect(() => {
			this.snekStateService.gameClock();
			this.processNextCommand();
		});

		effect(() => {
			this.snekStateService.gameOver();
			this.resetCommandQueue();
		});
	}

	public ngOnDestroy(): void {
		this.keydownUnsubscribeCallback();
		this.keyupUnsubscribeCallback();
	}


	// region Handle Inputs
	private handleKeydown(keyboardEvent: KeyboardEvent): void {
		const snekDirection = this.getKeyboardDirection(keyboardEvent);
		if (snekDirection !== null) {
			this.enterKeydown(snekDirection);
		}
	}

	private handleKeyup(keyboardEvent: KeyboardEvent): void {
		const snekDirection = this.getKeyboardDirection(keyboardEvent);
		if (snekDirection !== null) {
			this.enterKeyup(snekDirection);
		}
	}

	public handleJoystick(event: JoystickOutputData): void {
		const snekDirection = this.getJoystickDirection(event);
		if (snekDirection !== null) {
			this.enterCommand(snekDirection);
		}
	}
	// endregion Handle Inputs


	// region Get Input Directions
	private getKeyboardDirection(keyboardEvent: KeyboardEvent): SnekDirection | null {
		if (untracked(this.snekStateService.paused)) {
			return null;
		}

		switch (keyboardEvent.key) {
			case 'w':
			case 'ArrowUp':
				return SnekDirection.UP;
			case 's':
			case 'ArrowDown':
				return SnekDirection.DOWN;
			case 'a':
			case 'ArrowLeft':
				return SnekDirection.LEFT;
			case 'd':
			case 'ArrowRight':
				return SnekDirection.RIGHT;
			default:
				return null;
		}
	}

	private getJoystickDirection(event: JoystickOutputData): SnekDirection | null {
		if (untracked(this.snekStateService.paused)) {
			return null;
		}

		switch (event.direction?.angle) {
			case 'up':
				return SnekDirection.UP;
			case 'down':
				return SnekDirection.DOWN;
			case 'left':
				return SnekDirection.LEFT;
			case 'right':
				return SnekDirection.RIGHT;
			default:
				return null;
		}
	}
	// endregion Get Input Directions


	// region Enter Key Presses
	private enterKeydown(direction: SnekDirection): void {
		const keydownSet = union(new Set(untracked(this.keydownQueue)), new Set([ direction ]));
		this.keydownQueue.set([ ...keydownSet ]);

		this.enterCommand(direction);
	}

	private enterKeyup(direction: SnekDirection): void {
		const keydownSet = difference(new Set(untracked(this.keydownQueue)), new Set([ direction ]));
		this.keydownQueue.set([ ...keydownSet ]);

		const previousKeydown = [ ...keydownSet ].pop();
		if (typeof previousKeydown !== 'undefined') {
			this.enterCommand(previousKeydown);
		}
	}
	// endregion Enter Key Presses


	// region Enter Commands
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
	// endregion Enter Commands


	// region Process Commands
	private processNextCommand(): void {
		this.commandQueue.set(untracked(this.commandQueue).slice(1));
	}

	private resetCommandQueue(): void {
		this.keydownQueue.set([]);
		this.commandQueue.set([]);
	}

	private changeDirection(commandQueue: readonly SnekDirection[]): void {
		if (commandQueue.length > 0) {
			const direction = commandQueue[0] as SnekDirection;
			this.snekStateService.directionInput.set(direction);
		}
	}
	// endregion Process Commands
}
