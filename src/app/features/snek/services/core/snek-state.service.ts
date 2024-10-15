import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';

@Injectable()
export class SnekStateService {
	private readonly snekResolutionService = inject(SnekResolutionService);

	public readonly directionInput = signal<SnekDirection | undefined>(undefined);
	public readonly resetInput = signal(false);

	public readonly paused = computed(() =>
		(this.resetInput()) || (typeof this.gameOver() !== 'undefined'));
	public readonly playing = computed(() =>
		(!this.paused()) && (typeof this.directionInput() !== 'undefined'));

	public readonly gameClock = toSignal(timer(100, 100));
	public readonly snekGame = signal(SnekGame.new(...untracked(this.snekResolutionService.resolution)));
	public readonly gameState = signal(SnekGameState.from(untracked(this.snekGame)));

	public readonly score = computed(() => this.gameState()?.score ?? 0);
	public readonly gameOver = computed(() => this.snekGame()?.gameOver());

	public readonly highScore = computed(() => {
		this.resetInput();
		return SnekStateService.localStorageHighScore;
	});

	public constructor() {
		effect(() => this.initializeGame(), allowWrites);
		effect(() => this.initializeGameState(), allowWrites);
		effect(() => this.persistHighScore());
	}

	public resetSnekGame(): void {
		/* set, and then promptly clear, reset flag */
		this.resetInput.set(true);
		this.directionInput.set(undefined);
		setTimeout(() => this.resetInput.set(false));
	}

	private initializeGame(): void {
		const resolution = this.snekResolutionService.resolution();
		this.resetInput();

		this.snekGame.set(SnekGame.new(...resolution));
	}

	private initializeGameState(): void {
		const direction = untracked(this.directionInput);
		const playing = this.playing();
		const snekGame = this.snekGame();
		this.gameClock();

		if (playing && typeof direction !== 'undefined') {
			snekGame.snek.direction = direction;
			snekGame.moveSnek();

			this.gameState.set(SnekGameState.from(snekGame));
		}
	}

	private persistHighScore(): void {
		const gameOverMessage = this.gameOver();

		if (typeof gameOverMessage !== 'undefined') {
			SnekStateService.localStorageHighScore = untracked(this.score);
		}
	}

	private static get localStorageHighScore(): number {
		return JSON.parse(localStorage.getItem('snek-high-score') ?? '0') as number;
	}

	private static set localStorageHighScore(highScore: number) {
		if (highScore > this.localStorageHighScore) {
			localStorage.setItem('snek-high-score', `${ highScore }`);
		}
	}
}
