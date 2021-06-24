import { ChangeDetectionStrategy, Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { catchError, tap } from 'rxjs/operators';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: [ './snek.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekComponent implements OnDestroy {
	private subscription: Subscription;
	private playing = false;
	private paused = false;

	@Observed() private snekGame: SnekGame;
	public readonly snekGame$: Observable<SnekGame>;

	public readonly width = 35;
	public readonly height = 25;
	public readonly initialSnekLength = 3;
	public readonly SnekGridNodeType = SnekGridNodeType;
	private _highScore: number;

	constructor(
		public dialog: MatDialog,
	) {
		this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
		this._highScore = JSON.parse(localStorage.getItem('snek-high-score')) ?? 0;
	}

	ngOnDestroy(): void {
		this.pause();
	}

	@HostListener('document:keydown', [ '$event' ])
	private keyDown(keyboardEvent: KeyboardEvent): void {
		if (this.paused) {
			return;
		}

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
		}
	}

	private play(): void {
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
		const dialogRef = this.dialog.open(
			SnekResultsComponent,
			{
				width: '300px',
				data: {
					score,
					highScore: this._highScore,
				}
			});

		dialogRef.afterClosed().subscribe(() => {
			this.snekGame = SnekGame.new(this.width, this.height, this.initialSnekLength);
			this.highScore = score;
			this.paused = false;
		});
	}

	private pause(): void {
		this.paused = true;
		if (this.playing) {
			this.playing = false;
			this.subscription.unsubscribe();
		}
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
}

@Component({
	selector: 'snek-results',
	template: `
		<h1>{{ newHighScore ? 'Congratulations!' : 'woof' }}</h1>
		<h4 *ngIf="newHighScore">New High Score: <b>{{ results.score }}</b></h4>
		<h4 *ngIf="!newHighScore">you lost with <b>{{ results.score }}</b> points</h4>
		<footer style="width: 100%; display: flex; flex-flow: row-reverse nowrap">
			<button mat-flat-button color="primary" [mat-dialog-close]>yup</button>
		</footer>
	`,
})
export class SnekResultsComponent {
	public readonly newHighScore: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public results: { score: number, highScore: number },
	) {
		this.newHighScore = results.score > results.highScore;
	}
}
