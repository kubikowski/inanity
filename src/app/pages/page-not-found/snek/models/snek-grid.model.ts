import { Snek } from './snek.model';
import { SnekGridNode } from './snek-grid-node.model';
import { SnekDirection } from './snek-direction.enum';
import { SnekNode } from './snek-node.model';

export class SnekGrid {
	private readonly _grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;

	private constructor(
		private readonly _width: number,
		private readonly _height: number,
	) {
		this._grid = Array.from(Array(_height),
			(row, height) => Array.from(Array(_width),
				(node, width) => SnekGridNode.new(width, height)));
		this.initializeGridNodes();
	}

	public static new(width: number, height: number): SnekGrid {
		return new SnekGrid(width, height);
	}

	private initializeGridNodes(): void {
		this._grid.forEach((gridRow, height) => {
			gridRow.forEach((gridLocation, width) => {
				const up = this.at(width, height - 1);
				const down = this.at(width, height + 1);
				const left = this.at(width - 1, height);
				const right = this.at(width + 1, height);
				gridLocation.initialize(up, down, left, right);
			});
		});
	}

	public attachSnek(snek: Snek): void {
		let currentGridNode = this.at(1, Math.floor(this._height / 2));
		let currentSnekNode = snek.tail;

		while (currentSnekNode instanceof SnekNode) {
			currentGridNode.attachSnekNode(currentSnekNode);
			currentSnekNode.attachSnekGridNode(currentGridNode);

			currentGridNode = currentGridNode.next(SnekDirection.RIGHT);
			currentSnekNode = currentSnekNode.parent;
		}
	}

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this._grid;
	}

	private at(width: number, height: number): SnekGridNode {
		if (width >= 0 && width < this._width && height >= 0 && height < this._height) {
			return this._grid[height][width];
		} else {
			return null;
		}
	}
}
