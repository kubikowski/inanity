import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';

export class SnekGameState {
	private constructor(
		public readonly headNode: SnekGridNode,
		public readonly fudNode: SnekGridNode,
		public readonly direction: SnekDirection,
		public readonly snekLength: number,
		public readonly gameCounter: number,
	) { }

	public static from(snekGame: SnekGame, gameCounter: number): SnekGameState {
		const headNode = snekGame.snek.head.snekGridNode;
		const fudNode = snekGame.fudNode;
		const direction = snekGame.snek.direction;
		const snekLength = snekGame.snek.length;

		return new SnekGameState(headNode, fudNode, direction, snekLength, gameCounter);
	}

	public toConsoleFormat(): ThisType<SnekGameState> {
		const { headNode, fudNode, direction, snekLength, gameCounter } = this;

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
			snekLength,
			gameCounter,
		};
	}
}
