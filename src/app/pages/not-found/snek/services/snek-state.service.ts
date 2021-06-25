import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, map, scan, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

@Injectable()
export class SnekStateService implements OnDestroy {
	private gameCounterSubscription: Subscription;
	public playing = false;
	public paused = false;

	public readonly width = 35;
	public readonly height = 25;
	public readonly initialSnekLength = 3;

	@Observed() public snekGame: SnekGame;
	public readonly snekGame$: Observable<SnekGame>;

	@Observed() public highScore: number;
	public readonly highScore$: Observable<number>;

	@Observed() public gameState: SnekGameState = null;
	public readonly gameState$: Observable<SnekGameState>;

	@Observed({ type: 'subject' }) private gameOver: void = null;
	public readonly gameOver$: Observable<void>;

	constructor() {
		this.resetSnekGame();
	}

	ngOnDestroy(): void {
		this.stopGame();
	}

	public resetSnekGame(): void {
		SnekStateService.localStorageHighScore = (this.snekGame?.snek.length ?? this.initialSnekLength) - this.initialSnekLength;

		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
		this.highScore = SnekStateService.localStorageHighScore;

		this.paused = false;
	}

	public play(): void {
		if (!this.playing) {
			this.playing = true;
			this.startGame();
		}
	}

	private startGame(): void {
		this.gameCounterSubscription = timer(100, 100)
			.pipe(
				tap(() => this.snekGame.snekLegs()),
				scan((ignoredAcc, ignoredVal, gameCounter) => gameCounter),
				map(gameCounter => SnekGameState.from(this.snekGame, gameCounter)),
				tap(gameState => this.gameState = gameState),
				catchError(error => {
					this.stopGame();
					return of(error.message);
				}),
			).subscribe();
	}

	private stopGame(): void {
		this.paused = true;

		if (this.playing) {
			this.playing = false;
			this.gameCounterSubscription.unsubscribe();

			this.gameOver = null;
		}
	}

	private static get localStorageHighScore(): number {
		return JSON.parse(localStorage.getItem('snek-high-score'))
			?? 0;
	}

	private static set localStorageHighScore(highScore: number) {
		if (highScore > this.localStorageHighScore) {
			localStorage.setItem('snek-high-score', `${ highScore }`);
		}
	}
}
