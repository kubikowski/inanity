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

	private static getPossibleDirections(headNode: SnekGridNode, currentDirection: SnekDirection): ReadonlySet<SnekDirection> {
		const possible = new Set(SnekDirection.all);

		possible.delete(SnekDirection.inverse(currentDirection) as SnekDirection);

		SnekDirection.all.forEach(direction => {
			const next = headNode.next(direction);

			if (!(next instanceof SnekGridNode) || next.type === SnekGridNodeType.SNEK) {
				possible.delete(direction);
			}
		});

		return possible;
	}

	private static getOptimalDirections(headNode: SnekGridNode, fudNode: SnekGridNode): SnekDirection[] {
		return [
			this.getOptimalHorizontalDirection(headNode, fudNode),
			this.getOptimalVerticalDirection(headNode, fudNode),
		].filter(value => value !== null) as SnekDirection[];
	}

	private static getOptimalHorizontalDirection(headNode: SnekGridNode, fudNode: SnekGridNode): SnekDirection | null {
		if (fudNode.width > headNode.width) {
			return SnekDirection.RIGHT;
		} else if (fudNode.width < headNode.width) {
			return SnekDirection.LEFT;
		} else {
			return null;
		}
	}

	private static getOptimalVerticalDirection(headNode: SnekGridNode, fudNode: SnekGridNode): SnekDirection | null {
		if (fudNode.height > headNode.height) {
			return SnekDirection.DOWN;
		} else if (fudNode.height < headNode.height) {
			return SnekDirection.UP;
		} else {
			return null;
		}
	}

	private static getSubOptimalDirections(possible: ReadonlySet<SnekDirection>, optimal: ReadonlyArray<SnekDirection>): ReadonlyArray<SnekDirection> {
		return [ ...difference(new Set(possible), new Set(optimal)) ];
	}
}
