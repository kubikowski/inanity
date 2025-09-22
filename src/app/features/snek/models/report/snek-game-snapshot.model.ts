import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';

export type GridNode = `${ number }x${ number }`;

export class SnekGameSnapshot {
	private constructor(
		public readonly headNode: GridNode,
		public readonly tailNode: GridNode,
		public readonly foodNode: GridNode,
		public readonly direction: SnekDirection,
		public readonly score: number,
		public readonly gameCounter: number,
		public readonly gameOver: string | null,
	) { }

	public static from(gameState: SnekGameState): SnekGameSnapshot {
		const { headNode, tailNode, foodNode, direction, score, gameCounter, gameOver } = gameState;

		return new SnekGameSnapshot(
			`${ headNode.width }x${ headNode.height }`,
			`${ tailNode.width }x${ tailNode.height }`,
			`${ foodNode.width }x${ foodNode.height }`,
			direction,
			score,
			gameCounter,
			gameOver,
		);
	}
}
