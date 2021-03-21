import { Component, HostListener, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { catchError, tap } from 'rxjs/operators';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SnekDirection } from 'src/app/pages/page-not-found/snek/models/snek-direction.enum';
import { SnekGame } from 'src/app/pages/page-not-found/snek/models/snek-game.model';
import { SnekGridNodeType } from 'src/app/pages/page-not-found/snek/models/snek-grid-node-type.enum';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: ['./snek.component.scss']
})
export class SnekComponent implements OnDestroy {
	private subscription: Subscription;
	private playing = false;

	@Observed() private snekGame = SnekGame.new(35, 25);
	public readonly snekGame$: Observable<SnekGame>;

	public readonly SnekGridNodeType = SnekGridNodeType;

	constructor() {}

	@HostListener('document:keydown', [ '$event' ])
	private keyDown(keyboardEvent: KeyboardEvent): void {
		switch (keyboardEvent.key) {
			case 'w':
			case 'ArrowUp':
				this.play();
				this.snekGame.snek.direction = SnekDirection.UP;
				break;
			case 's':
			case 'ArrowDown':
				this.play();
				this.snekGame.snek.direction = SnekDirection.DOWN;
				break;
			case 'a':
			case 'ArrowLeft':
				this.play();
				this.snekGame.snek.direction = SnekDirection.LEFT;
				break;
			case 'd':
			case 'ArrowRight':
				this.play();
				this.snekGame.snek.direction = SnekDirection.RIGHT;
				break;
			case 'Escape':
				this.pause();
				break;
			case 'p':
			case 'Space':
				(this.subscription instanceof Subscription)
					? this.pause()
					: this.play();
				break;
		}
	}

	private play(): void {
		if (!this.playing) {
			this.playing = true;
			this.subscription = timer(100, 100)
				.pipe(tap(() => this.snekGame.snekLegs()),
					catchError(error => {
						this.reset();
						return of(error.message);
					}))
				.subscribe();
		}
	}

	private pause(): void {
		if (this.playing) {
			this.playing = false;
			this.subscription.unsubscribe();
		}
	}

	private reset(): void {
		this.pause();
		const length = this.snekGame.snek.length;
		console.log('new high score: ' + length);
		this.snekGame = SnekGame.new(35, 25);
	}

	ngOnDestroy(): void {
		this.pause();
	}
}
