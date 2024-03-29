import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { catchError, debounceTime, distinctUntilChanged, map, scan, tap, throttleTime } from 'rxjs/operators';
import { notNullFilter } from 'src/app/core/functions/rxjs/not-null-filter.function';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStateService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private gameCounterSubscription: Subscription | undefined;

	public playing = false;
	public paused = false;

	public readonly initialSnekLength = 3;

	@Observed() public snekGame!: SnekGame;
	@Observed() public score!: number;
	@Observed() public highScore!: number;
	@Observed() public gameState: SnekGameState | null = null;
	@Observed('subject') private gameOver?: string;

	public readonly snekGame$!: Observable<SnekGame>;
	public readonly score$!: Observable<number>;
	public readonly highScore$!: Observable<number>;
	public readonly gameState$!: Observable<SnekGameState | null>;
	public readonly gameOver$!: Observable<string>;

	public constructor(
		private readonly snekResolutionService: SnekResolutionService,
	) {
		this.initializeGridResolution();
		this.initializeScore();

		this.resetSnekGame();
	}

	public ngOnDestroy(): void {
		this.stopGame('de-rendering snek');
		this.subscriptions.unsubscribe();
	}

	public resetSnekGame(): void {
		SnekStateService.localStorageHighScore = this.score ?? 0;

		const { snekWidth, snekHeight } = this.snekResolutionService;
		this.snekGame = SnekGame.new(snekWidth, snekHeight, this.initialSnekLength);

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
			this.gameCounterSubscription?.unsubscribe();

			this.gameOver = gameOverMessage;
		}

		return of(gameOverMessage);
	}

	private getGameState(gameCounter: number): SnekGameState {
		return SnekGameState.from(this.snekGame, this.initialSnekLength, gameCounter);
	}

	private initializeGridResolution(): void {
		this.subscriptions.sink = this.snekResolutionService.onResolutionChange$
			.pipe(debounceTime(0), throttleTime(250))
			.subscribe(() => (this.playing)
				? this.stopGame('resolution changed')
				: this.resetSnekGame());
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
		return JSON.parse(localStorage.getItem('snek-high-score') ?? '0');
	}

	private static set localStorageHighScore(highScore: number) {
		if (highScore > this.localStorageHighScore) {
			localStorage.setItem('snek-high-score', `${ highScore }`);
		}
	}
}
