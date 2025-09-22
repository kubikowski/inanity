import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { SnekGameReport } from 'src/app/features/snek/models/report/snek-game-report.model';
import { SnekGameSnapshot } from 'src/app/features/snek/models/report/snek-game-snapshot.model';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekStatisticsService {
	private readonly snekStateService = inject(SnekStateService);

	private readonly gameStateLog = signal(<SnekGameSnapshot[]>[]);
	private readonly gameReport = signal<SnekGameReport | null>(null);

	public constructor() {
		effect(() => this.logGameState());
		effect(() => this.generateGameReport());
		effect(() => this.logGameReport());
	}

	private logGameState(): void {
		const gameStateLog = untracked(this.gameStateLog);
		const previousScore = gameStateLog[gameStateLog.length - 1]?.score ?? -1;
		const currentGameState = this.snekStateService.gameState();

		if (currentGameState.score !== previousScore && currentGameState.gameOver === null) {
			gameStateLog.push(SnekGameSnapshot.from(currentGameState));
		}
	}

	private generateGameReport(): void {
		const gameOverMessage = this.snekStateService.gameOver();

		if (gameOverMessage !== null) untracked(() => {
			const snekGame = this.snekStateService.snekGame();
			const scoringStates = this.gameStateLog();
			const finalState = SnekGameSnapshot.from(this.snekStateService.gameState());
			const gameReport = SnekGameReport.from(snekGame, scoringStates, finalState);

			this.gameReport.set(gameReport);
		});
	}

	private logGameReport(): void {
		const gameReport = this.gameReport();
		console.log(gameReport);

		this.gameStateLog.set([]);
	}
}
