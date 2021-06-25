import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, map, scan, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/snek-dialog.service';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

@Injectable()
export class SnekService implements OnDestroy {
	private subscription: Subscription;
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

	constructor(
		private snekDialogService: SnekDialogService,
	) {
		this.resetSnekGame();
	}

	ngOnDestroy(): void {
		this.pause();
	}

	private resetSnekGame(): void {
		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
		this.highScore = SnekService.localStorageHighScore;
		this.paused = false;
	}

	public play(): void {
		if (!this.playing) {
			this.playing = true;
			this.startGame();
		}
	}

	private pause(): void {
		this.paused = true;

		if (this.playing) {
			this.playing = false;
			this.subscription.unsubscribe();
		}
	}

	private startGame(): void {
		this.subscription = timer(100, 100)
			.pipe(
				tap(() => this.snekGame.snekLegs()),
				scan((ignoredAcc, ignoredVal, gameCounter) => gameCounter),
				map(gameCounter => SnekGameState.from(this.snekGame, gameCounter)),
				tap(gameState => this.gameState = gameState),
				catchError(error => {
					this.gameOver();
					return of(error.message);
				}),
			).subscribe();
	}

	private gameOver(): void {
		this.pause();
		const score = this.snekGame.snek.length - this.initialSnekLength;

		this.snekDialogService.results(score, this.highScore)
			.subscribe(() => {
				SnekService.localStorageHighScore = score;
				this.resetSnekGame();
			});
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
