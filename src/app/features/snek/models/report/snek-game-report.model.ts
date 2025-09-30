import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekPackingUtil } from 'src/app/features/snek/models/report/snek-packing.util';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';
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
		public readonly counter: number,
		public readonly seed: number,
		public readonly width: number,
		public readonly height: number,
		public readonly directions: string,
		public readonly scoringStates: string[],
		public readonly finalState: string,
		public readonly gameOver: string,
	) { }

	public static from(snekGame: SnekGame, directions: SnekDirection[], scoringStates: SnekGameState[], finalState: SnekGameState): SnekGameReport {
		return new SnekGameReport(
			finalState.score,
			finalState.counter,
			snekGame.seed,
			snekGame.width,
			snekGame.height,
			SnekPackingUtil.packDirections(directions),
			scoringStates.map(state => SnekPackingUtil.packState(state)),
			SnekPackingUtil.packState(finalState),
			finalState.gameOver!,
		);
	}

	public unpack(): ThisType<SnekGameReport> {
		const { score, counter, seed, width, height, gameOver } = this;
		const directions = SnekPackingUtil.unpackDirections(this.directions);
		const scoringStates = this.scoringStates.map(packedState => SnekPackingUtil.unpackState(packedState));
		const finalState = SnekPackingUtil.unpackState(this.finalState);

		return { score, counter, seed, width, height, directions, scoringStates, finalState, gameOver };
	}
}
