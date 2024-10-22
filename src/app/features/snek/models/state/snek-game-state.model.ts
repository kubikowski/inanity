import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';

export class SnekGameState {
	private constructor(
		public readonly headNode: SnekGridNode,
		public readonly tailNode: SnekGridNode,
		public readonly foodNode: SnekGridNode,
		public readonly direction: SnekDirection,
		public readonly score: number,
		public readonly gameCounter: number,
		public readonly gameOver: string | null,
	) { }

	public static from(snekGame: SnekGame): SnekGameState {
		const headNode = snekGame.snek.head.snekGridNode;
		const tailNode = snekGame.snek.tail.snekGridNode;
		const foodNode = snekGame.foodNode;
		const direction = snekGame.snek.direction;
		const score = snekGame.snek.length - SnekGame.initialSnekLength;
		const gameCounter = snekGame.counter;
		const gameOver = snekGame.gameOver;

		return new SnekGameState(headNode, tailNode, foodNode, direction, score, gameCounter, gameOver);
	}

	public format(): ThisType<SnekGameState> {
		const { headNode, tailNode, foodNode, direction, score, gameCounter, gameOver } = this;

		return {
			headNode: {
				width: headNode.width,
				height: headNode.height,
			},
			tailNode: {
				width: tailNode.width,
				height: tailNode.height,
			},
			foodNode: {
				width: foodNode.width,
				height: foodNode.height,
			},
			direction,
			score,
			gameCounter,
			gameOver,
		};
	}
}
