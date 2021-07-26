import { difference } from 'src/app/core/functions/sets/difference.function';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';

export class SnekDirectionClassifications {
	private constructor(
		public readonly optimal: ReadonlyArray<SnekDirection>,
		public readonly subOptimal: ReadonlyArray<SnekDirection>,
		public readonly currentDirection: SnekDirection,
	) { }

	public get next(): SnekDirection {
		return this.optimal[0]
			?? this.subOptimal[0]
			?? this.currentDirection;
	}

	public static from(gameState: SnekGameState): SnekDirectionClassifications {
		const { headNode, fudNode, direction } = gameState;

		const possible = this.getPossibleDirections(headNode, direction);

		const optimal = this.getOptimalDirections(headNode, fudNode)
			.filter(optimalDirection => possible.has(optimalDirection));

		const subOptimal = this.getSubOptimalDirections(possible, optimal);

		return new SnekDirectionClassifications(optimal, subOptimal, direction);
	}

	private static readonly SnekDirections = [ SnekDirection.UP, SnekDirection.DOWN, SnekDirection.LEFT, SnekDirection.RIGHT ];

	private static getPossibleDirections(headNode: SnekGridNode, currentDirection: SnekDirection): ReadonlySet<SnekDirection> {
		const possible = new Set(this.SnekDirections);

		possible.delete(SnekDirection.inverse(currentDirection));

		this.SnekDirections.forEach(direction => {
			const next = headNode.next(direction);

			if (!(next instanceof SnekGridNode) || next.type === SnekGridNodeType.SNEK) {
				possible.delete(direction);
			}
		});

		return possible;
	}

	private static getOptimalDirections(headNode: SnekGridNode, fudNode: SnekGridNode): SnekDirection[] {
		const deltaWidth = fudNode.width - headNode.width;
		const deltaHeight = fudNode.height - headNode.height;

		return [
			(deltaWidth > 0) ? SnekDirection.RIGHT
				: (deltaWidth < 0) ? SnekDirection.LEFT
				: null,
			(deltaHeight > 0) ? SnekDirection.DOWN
				: (deltaHeight < 0) ? SnekDirection.UP
				: null,
		].filter(Boolean);
	}

	private static getSubOptimalDirections(possible: ReadonlySet<SnekDirection>, optimal: ReadonlyArray<SnekDirection>): ReadonlyArray<SnekDirection> {
		return [ ...difference(new Set(possible), new Set(optimal)) ];
	}
}
