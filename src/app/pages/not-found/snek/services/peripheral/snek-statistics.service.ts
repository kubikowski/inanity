import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/state/snek-game-state.model';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStatisticsService {
	private readonly subscriptions = new SubSink();

	private gameStateLog: SnekGameState[] = [];

	constructor(
		private readonly snekStateService: SnekStateService,
	) {
		this.logGameState();
		this.printGameStateLog();
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
				map(() => this.gameStateLog[this.gameStateLog.length - 1]?.toConsoleFormat() ?? 'ur bad kid'),
				tap(gameStateLog => console.log(gameStateLog)),
			).subscribe(() => this.gameStateLog = []);
	}
}
