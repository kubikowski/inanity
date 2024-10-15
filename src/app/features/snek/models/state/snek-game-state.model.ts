import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';

export class SnekGameState {
	private constructor(
		public readonly headNode: SnekGridNode,
		public readonly fudNode: SnekGridNode,
		public readonly direction: SnekDirection,
		public readonly score: number,
		public readonly gameCounter: number,
	) { }

	public static from(snekGame: SnekGame): SnekGameState {
		const headNode = snekGame.snek.head.snekGridNode;
		const fudNode = snekGame.fudNode;
		const direction = snekGame.snek.direction;
		const score = snekGame.snek.length - SnekGame.initialSnekLength;
		const gameCounter = snekGame.counter;

		return new SnekGameState(headNode, fudNode, direction, score, gameCounter);
	}

	public format(): ThisType<SnekGameState> {
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
