import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, scan, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/state/snek-game-state.model';
import { SnekGame } from 'src/app/pages/not-found/snek/models/state/snek-game.model';
import { SnekResolutionService } from 'src/app/pages/not-found/snek/services/core/snek-resolution.service';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStateService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private gameCounterSubscription: Subscription;

	public playing = false;
	public paused = false;

	public snekGridWidth;
	public snekGridHeight;
	public readonly initialSnekLength = 3;

	@Observed() public snekGame: SnekGame;
	public readonly snekGame$: Observable<SnekGame>;

	@Observed() public score: number;
	public readonly score$: Observable<number>;

	@Observed() public highScore: number;
	public readonly highScore$: Observable<number>;

	@Observed() public gameState: SnekGameState = null;
	public readonly gameState$: Observable<SnekGameState>;

	@Observed({ type: 'subject' }) private gameOver: string = null;
	public readonly gameOver$: Observable<string>;

	constructor(
		private readonly snekResolutionService: SnekResolutionService,
	) {
		this.initializeBoardResolution();

		this.resetSnekGame();

		this.initializeScore();
	}

	ngOnDestroy(): void {
		this.stopGame('de-rendering snek');
		this.subscriptions.unsubscribe();
	}

	private initializeBoardResolution(): void {
		const { snekWidth$, snekHeight$, resolutionChange$ } = this.snekResolutionService;

		this.subscriptions.sink = snekWidth$
			.subscribe(snekWidth => this.snekGridWidth = snekWidth);
		this.subscriptions.sink = snekHeight$
			.subscribe(snekHeight => this.snekGridHeight = snekHeight);

		this.subscriptions.sink = resolutionChange$
			.pipe(debounceTime(250))
			.subscribe(() => (this.playing)
				? this.stopGame('resolution changed')
				: this.resetSnekGame());
	}

	public resetSnekGame(): void {
		SnekStateService.localStorageHighScore = this.score ?? 0;

		this.snekGame = SnekGame.new(this.snekGridWidth, this.snekGridHeight, this.initialSnekLength);

		this.score = 0;
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
				tap(() => this.snekGame.moveSnek()),
				scan(gameCounter => gameCounter + 1, 0),
				map(gameCounter => this.getGameState(gameCounter)),
				tap(gameState => this.gameState = gameState),
				catchError(error => this.stopGame(error.message)),
			).subscribe();
	}

	private stopGame(gameOverMessage: string): Observable<string> {
		this.paused = true;

		if (this.playing) {
			this.playing = false;
			this.gameCounterSubscription.unsubscribe();

			this.gameOver = gameOverMessage;
		}

		return of(gameOverMessage);
	}

	private getGameState(gameCounter: number): SnekGameState {
		return SnekGameState.from(this.snekGame, this.initialSnekLength, gameCounter);
	}

	private initializeScore(): void {
		this.subscriptions.sink = this.gameState$
			.pipe(
				notNullFilter(),
				map(gameState => gameState.score),
				distinctUntilChanged(),
			).subscribe(score => this.score = score);
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
