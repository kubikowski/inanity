import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, tap } from 'rxjs/operators';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekService } from 'src/app/pages/not-found/snek/services/snek.service';
import { notNullFilter } from 'src/app/shared/functions/rxjs/not-null-filter.function';
import { SubSink } from 'subsink';

@Injectable()
export class SnekStatisticsService {
	private readonly subscriptions = new SubSink();

	private readonly gameState$: Observable<SnekGameState>;
	private gameStateLog: SnekGameState[] = [];

	constructor(
		private snekService: SnekService,
	) {
		this.gameState$ = this.snekService.gameState$;

		this.logGameState();
	}

	private logGameState(): void {
		this.subscriptions.sink = this.gameState$
			.pipe(
				notNullFilter(),
				distinctUntilKeyChanged('snekLength'),
				tap(this.resetGameStateLog.bind(this)),
			).subscribe(gameState => this.gameStateLog.push(gameState));
	}

	private resetGameStateLog(gameState: SnekGameState): void {
		const lastGameCounter = this.gameStateLog[this.gameStateLog.length - 1]?.gameCounter ?? 0;

		if (gameState.gameCounter < lastGameCounter) {
			this.printResults();
			this.gameStateLog = [];
		}
	}

	public printResults(): void {
		console.log(this.gameStateLog);
	}
}
