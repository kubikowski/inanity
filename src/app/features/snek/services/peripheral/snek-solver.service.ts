import { effect, inject, Injectable, signal } from '@angular/core';
import { allowWrites } from 'src/app/core/functions/signal/allow-writes.constant';
import { SnekDirectionClassifications } from 'src/app/features/snek/models/direction/snek-direction-classifications.model';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';

@Injectable()
export class SnekSolverService {
	private readonly snekStateService = inject(SnekStateService);

	public readonly enabled = signal(false);

	public constructor() {
		effect(() => {
			if (this.enabled()) {
				const gameState = this.snekStateService.gameState();

				if (typeof gameState !== 'undefined') {
					this.changeDirection(gameState);
				}
			}
		}, allowWrites);
	}

	private changeDirection(gameState: SnekGameState): void {
		const direction = SnekSolverService.getNextDirection(gameState);

		this.snekStateService.directionInput.set(direction);
	}

	private static getNextDirection(gameState: SnekGameState): SnekDirection {
		const directionClassifications = SnekDirectionClassifications.from(gameState);

		return directionClassifications.next;
	}
}
