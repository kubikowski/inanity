import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { GridNode, SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';

export class SnekGameState {
	private constructor(
		public readonly score: number,
		public readonly counter: number,
		public readonly headNode: SnekGridNode,
		public readonly tailNode: SnekGridNode,
		public readonly foodNode: SnekGridNode,
		public readonly direction: SnekDirection,
		public readonly gameOver: string | null,
	) { }

	public static from(snekGame: SnekGame): SnekGameState {
		const score = snekGame.snek.length - SnekGame.initialSnekLength;
		const counter = snekGame.counter;
		const headNode = snekGame.snek.head.snekGridNode;
		const tailNode = snekGame.snek.tail.snekGridNode;
		const foodNode = snekGame.foodNode;
		const direction = snekGame.snek.direction;
		const gameOver = snekGame.gameOver;

		return new SnekGameState(score, counter, headNode, tailNode, foodNode, direction, gameOver);
	}

	public static of(score: number, counter: number, headNode: GridNode, tailNode: GridNode, foodNode: GridNode, direction: SnekDirection): SnekGameState {
		return new SnekGameState(score, counter, headNode as SnekGridNode, tailNode as SnekGridNode, foodNode as SnekGridNode, direction, null);
	}
}
