import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SnekDirectionClassifications } from 'src/app/pages/not-found/snek/models/snek-direction-classifications.model';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekSolverService {
	private readonly subscriptions = new SubSink();
	private readonly gameState$: Observable<SnekGameState>;

	@Observed() public enabled = false;
	public readonly enabled$: Observable<boolean>;

	constructor(
		private snekStateService: SnekStateService
	) {
		this.gameState$ = this.snekStateService.gameState$;

		this.initializeSolver();
	}

	private initializeSolver(): void {
		this.subscriptions.sink = this.gameState$
			.pipe(
				filter(() => this.enabled),
				notNullFilter(),
			).subscribe(gameState => this.changeDirection(gameState));
	}

	private changeDirection(gameState: SnekGameState): void {
		const direction = SnekSolverService.getNextDirection(gameState);

		this.snekStateService.snekGame.snek.direction = direction;
	}

	private static getNextDirection(gameState: SnekGameState): SnekDirection {
		const directionClassifications = SnekDirectionClassifications.from(gameState);

		return directionClassifications.next;
	}
}
