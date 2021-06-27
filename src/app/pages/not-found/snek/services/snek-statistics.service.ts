import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStatisticsService {
	private readonly subscriptions = new SubSink();

	private readonly gameState$: Observable<SnekGameState>;
	private readonly gameOver$: Observable<void>;

	private gameStateLog: SnekGameState[] = [];

	constructor(
		private snekStateService: SnekStateService,
	) {
		this.gameState$ = this.snekStateService.gameState$;
		this.gameOver$ = this.snekStateService.gameOver$;

		this.logGameState();
		this.printGameStateLog();
	}

	private logGameState(): void {
		this.subscriptions.sink = this.gameState$
			.pipe(
				notNullFilter(),
				distinctUntilKeyChanged('score'),
			).subscribe(gameState => this.gameStateLog.push(gameState));
	}

	private printGameStateLog(): void {
		this.subscriptions.sink = this.gameOver$
			.pipe(
				map(() => this.gameStateLog[this.gameStateLog.length - 1].toConsoleFormat()),
				tap(gameStateLog => console.log(gameStateLog)),
			).subscribe(() => this.gameStateLog = []);
	}
}
