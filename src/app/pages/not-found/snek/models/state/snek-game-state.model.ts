import { SnekDirection } from 'src/app/pages/not-found/snek/models/direction/snek-direction.enum';
import { SnekGame } from 'src/app/pages/not-found/snek/models/state/snek-game.model';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/grid/snek-grid-node.model';

export class SnekGameState {
	private constructor(
		public readonly headNode: SnekGridNode,
		public readonly fudNode: SnekGridNode,
		public readonly direction: SnekDirection,
		public readonly score: number,
		public readonly gameCounter: number,
	) { }

	public static from(snekGame: SnekGame, initialSnekLength: number, gameCounter: number): SnekGameState {
		const headNode = snekGame.snek.head.snekGridNode;
		const fudNode = snekGame.fudNode;
		const direction = snekGame.snek.direction;
		const score = snekGame.snek.length - initialSnekLength;

		return new SnekGameState(headNode, fudNode, direction, score, gameCounter);
	}

	public toConsoleFormat(): ThisType<SnekGameState> {
		const { headNode, fudNode, direction, score, gameCounter } = this;

		return {
			headNode: {
				width: headNode.width,
				height: headNode.height,
			},
			fudNode: {
				width: fudNode.width,
				height: fudNode.height,
			},
			direction,
			score,
			gameCounter,
		};
	}
}
