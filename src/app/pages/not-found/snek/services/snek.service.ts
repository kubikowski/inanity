import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

	constructor(
		private snekDialogService: SnekDialogService,
	) {
		this.resetSnekGame();
	}

	ngOnDestroy(): void {
		this.pause();
	}

	public resetSnekGame(): void {
		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
		this.highScore = this.localStorageHighScore;
		this.paused = false;
	}

	public play(): void {
		if (!this.playing) {
			this.playing = true;
			this.subscription = timer(100, 100)
				.pipe(tap(() => this.snekGame.snekLegs()),
					catchError(error => {
						this.gameOver();
						return of(error.message);
					}))
				.subscribe();
		}
	}

	private gameOver(): void {
		this.pause();
		const score = this.snekGame.snek.length - this.initialSnekLength;

		const resultsDialog = this.snekDialogService.results(score, this.highScore);

		resultsDialog.subscribe(() => {
			this.localStorageHighScore = score;
			this.resetSnekGame();
		});
	}

	private pause(): void {
		this.paused = true;
		if (this.playing) {
			this.playing = false;
			this.subscription.unsubscribe();
		}
	}

	public get localStorageHighScore(): number {
		return JSON.parse(localStorage.getItem('snek-high-score'))
			?? 0;
	}

	public set localStorageHighScore(highScore: number) {
		if (highScore > this.localStorageHighScore) {
			localStorage.setItem('snek-high-score', `${ highScore }`);
		}
	}
}
