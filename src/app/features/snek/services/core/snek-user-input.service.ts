import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { filter } from 'rxjs/operators';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekUserInputService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private readonly listenerUnsubscribeCallback: () => void;

	@Observed() private commandQueue: ReadonlyArray<SnekDirection> = [];
	private readonly commandQueue$: Observable<ReadonlyArray<SnekDirection>>;

	public constructor(
		private readonly renderer: Renderer2,
		private readonly snekStateService: SnekStateService,
	) {
		this.initializeCommandQueue();
		this.listenerUnsubscribeCallback = this.keyDownEventListener;
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		this.listenerUnsubscribeCallback();
	}

	private get keyDownEventListener(): () => void {
		return this.renderer.listen('document', 'keydown', this.handleKeyDown.bind(this));
	}

	private handleKeyDown(keyboardEvent: KeyboardEvent): void {
		if (this.snekStateService.paused) {
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
		if (this.snekStateService.paused) {
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

	private initializeCommandQueue(): void {
		this.subscriptions.sink = this.commandQueue$
			.pipe(filter(commandQueue => commandQueue.length === 1))
			.subscribe(commandQueue => this.changeDirection(commandQueue[0]));

		this.subscriptions.sink = this.snekStateService.gameState$
			.subscribe(this.processNextCommand.bind(this));

		this.subscriptions.sink = this.snekStateService.gameOver$
			.subscribe(this.resetCommandQueue.bind(this));
	}

	private enterCommand(direction: SnekDirection): void {
		switch (this.commandQueue.length) {
			case 0:
				this.enterPrimaryCommand(direction);
				break;
			case 1:
				this.enterSecondaryCommand(direction);
				break;
		}
	}

	private enterPrimaryCommand(direction: SnekDirection): void {
		const playing = this.snekStateService.playing;
		const currentDirection = this.snekStateService.snekGame.snek.direction;

		if (SnekDirection.isValidChange(currentDirection, direction) || !playing) {
			this.commandQueue = [ direction ];
		}
	}

	private enterSecondaryCommand(direction: SnekDirection): void {
		const currentDirection = this.snekStateService.snekGame.snek.direction;
		const [ nextDirection ] = this.commandQueue;

		if (SnekDirection.isValidChange(nextDirection, direction)) {
			this.commandQueue = [ nextDirection, direction ];
		} else if (SnekDirection.isValidChange(currentDirection, direction)) {
			this.commandQueue = [ direction ];
		}
	}

	private processNextCommand(): void {
		this.commandQueue = this.commandQueue.slice(1);
	}

	private resetCommandQueue(): void {
		this.commandQueue = [];
	}

	private changeDirection(direction: SnekDirection): void {
		this.snekStateService.play();
		this.snekStateService.snekGame.snek.direction = direction;
	}
}
