import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SnekDirectionClassifications } from 'src/app/pages/not-found/snek/models/direction/snek-direction-classifications.model';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/direction/snek-direction.enum';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekSolverService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private readonly gameState$: Observable<SnekGameState>;

	@Observed() public enabled = false;
	public readonly enabled$: Observable<boolean>;

	constructor(
		private readonly snekStateService: SnekStateService
	) {
		this.gameState$ = this.snekStateService.gameState$;

		this.initializeSolver();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
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
