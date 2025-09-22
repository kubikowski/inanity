import { SnekGameSnapshot } from 'src/app/features/snek/models/report/snek-game-snapshot.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';

/**
 * TODO: account for user metadata such as:
 * - game start time
 * - game end time
 * - user nickname
 * - user device metadata maybe ?
 */
export class SnekGameReport {
	private constructor(
		public readonly score: number,
		public readonly seed: number,
		public readonly width: number,
		public readonly height: number,
		public readonly scoringStates: SnekGameSnapshot[],
		public readonly finalState: SnekGameSnapshot,
	) { }

	public static from(snekGame: SnekGame, scoringStates: SnekGameSnapshot[], finalState: SnekGameSnapshot): SnekGameReport {
		return new SnekGameReport(
			finalState.score,
			snekGame.seed,
			snekGame.width,
			snekGame.height,
			scoringStates,
			finalState,
		);
	}
}
