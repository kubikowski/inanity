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

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this._grid;
	}

	private initializeGridNodes(): void {
		this._grid.forEach((gridRow, height) => {
			gridRow.forEach((gridLocation, width) => {
				const up = this.at(width - 1, height - 2);
				const down = this.at(width - 1, height);
				const left = this.at(width - 2, height - 1);
				const right = this.at(width, height - 1);
				gridLocation.initialize(up, down, left, right);
			});
		});
	}

	private at(width: number, height: number): SnekGridNode {
		if (width < 0 || width >= this._width || height < 0 || height >= this._height) {
			return null;
		} else {
			return this._grid[height][width];
		}
	}

	public attachSnek(snek: Snek): void {
		const headHeight = Math.floor(this._height / 2);
		const headWidth = Math.floor((this._width - snek.length) / 2);

		let currentGridNode = this.at(headWidth, headHeight);
		let currentSnekNode = snek.head;

		while (currentSnekNode.child instanceof SnekNode) {
			currentGridNode.attachSnekNode(currentSnekNode);
			currentGridNode = currentGridNode.next(SnekDirection.RIGHT);
			currentSnekNode = currentSnekNode.child;
		}
	}
}
