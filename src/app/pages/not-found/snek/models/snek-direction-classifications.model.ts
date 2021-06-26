import { inverseDirection, SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGameState } from 'src/app/pages/not-found/snek/models/snek-game-state.model';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';
import { difference } from 'src/app/shared/functions/sets/difference.function';

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

	private static getPossibleDirections(headNode: SnekGridNode, currentDirection: SnekDirection): ReadonlySet<SnekDirection> {
		const allDirections = Object.values(SnekDirection);
		const possible = new Set(allDirections);

		possible.delete(inverseDirection(currentDirection));

		allDirections.forEach(direction => {
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
