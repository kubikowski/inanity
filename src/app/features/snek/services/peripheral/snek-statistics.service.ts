import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGameReport } from 'src/app/features/snek/models/report/snek-game-report.model';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekStatisticsService {
	private readonly snekStateService = inject(SnekStateService);

	private readonly gameDirectionLog = signal(<SnekDirection[]>[]);
	private readonly gameStateLog = signal(<SnekGameState[]>[]);
	private readonly gameReport = signal<SnekGameReport | null>(null);

	public constructor() {
		effect(() => this.logGameState());
		effect(() => this.generateGameReport());
		effect(() => this.logGameReport());
	}

	/**
	 * I don't know whether the "current direction" when `gameState()` is triggered
	 * is fully akin to the direction previously traveled.
	 * But I think that idiosyncrasy will have to stand for now.
	 *
	 * Long term, this should probably be reported by the input service.
	 * We will also need the input service to handle subframe inputs.
	 * And convert keydown & keyup into some form of like uint64 formatted frame inputs.
	 */
	private logGameState(): void {
		const gameDirectionLog = untracked(this.gameDirectionLog);
		const gameStateLog = untracked(this.gameStateLog);
		const previousScore = gameStateLog[gameStateLog.length - 1]?.score ?? -1;
		const currentGameState = this.snekStateService.gameState();

		if (currentGameState.counter === gameDirectionLog.length + 1) {
			gameDirectionLog.push(currentGameState.direction);
		}

		if (currentGameState.score !== previousScore && currentGameState.gameOver === null) {
			gameStateLog.push(currentGameState);
		}
	}

	private generateGameReport(): void {
		const gameOverMessage = this.snekStateService.gameOver();

		if (gameOverMessage !== null) untracked(() => {
			const snekGame = this.snekStateService.snekGame();
			const directions = this.gameDirectionLog();
			const scoringStates = this.gameStateLog();
			const finalState = this.snekStateService.gameState();
			const gameReport = SnekGameReport.from(snekGame, directions, scoringStates, finalState);

			this.gameReport.set(gameReport);
		});
	}

	private logGameReport(): void {
		const gameReport = this.gameReport();

		if (gameReport !== null) {
			console.log(gameReport.unpack());
			this.gameDirectionLog.set([]);
			this.gameStateLog.set([]);
		}
	}
}
