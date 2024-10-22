import { effect, inject, Injectable } from '@angular/core';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekStatisticsService {
	private readonly snekStateService = inject(SnekStateService);

	private gameStateLog = <SnekGameState[]>[];

	public constructor() {
		effect(() => {
			const previousScore = this.gameStateLog[this.gameStateLog.length - 1]?.score ?? 0;
			const currentGameState = this.snekStateService.gameState();

			if (currentGameState.score !== previousScore) {
				this.gameStateLog.push(currentGameState);
			}
		});

		effect(() => {
			const gameOverMessage = this.snekStateService.gameOver();

			if (gameOverMessage !== null) {
				console.log(this.gameStateLog);
				this.gameStateLog = [];
			}
		});
	}
}
