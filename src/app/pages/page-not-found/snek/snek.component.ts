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

	@Observed() private snekGame: SnekGame;
	public readonly snekGame$: Observable<SnekGame>;

	public readonly width = 35;
	public readonly height = 25;
	public readonly initialSnekLength = 3;
	public readonly SnekGridNodeType = SnekGridNodeType;
	private _highScore: number;

	constructor() {
		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
		this._highScore = JSON.parse(localStorage.getItem('snek-high-score')) ?? 0;
	}

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
		this.highScore = this.snekGame.snek.length - this.initialSnekLength;
		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
	}

	public get highScore(): number {
		return this._highScore;
	}

	public set highScore(highScore: number) {
		if (highScore > this._highScore) {
			this._highScore = highScore;
			localStorage.setItem('snek-high-score', `${ highScore }`);
		}
	}

	ngOnDestroy(): void {
		this.pause();
	}
}
