import { Injectable, OnDestroy } from '@angular/core';
import { distinctUntilKeyChanged, filter, map, tap } from 'rxjs/operators';
import { notNullFilter } from 'src/app/core/functions/rxjs/not-null-filter.function';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStatisticsService implements OnDestroy {
	private readonly subscriptions = new SubSink();

	private gameStateLog: SnekGameState[] = [];

	public constructor(
		private readonly snekStateService: SnekStateService,
	) {
		this.logGameState();
		this.printGameStateLog();
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private logGameState(): void {
		this.subscriptions.sink = this.snekStateService.gameState$
			.pipe(
				notNullFilter(),
				distinctUntilKeyChanged('score'),
			).subscribe(gameState => this.gameStateLog.push(gameState));
	}

	private printGameStateLog(): void {
		this.subscriptions.sink = this.snekStateService.gameOver$
			.pipe(
				filter(gameStateLog => gameStateLog.length > 0),
				map(() => this.gameStateLog[this.gameStateLog.length - 1].toConsoleFormat()),
				tap(gameStateLog => console.log(gameStateLog)),
			).subscribe(() => this.gameStateLog = []);
	}
}
