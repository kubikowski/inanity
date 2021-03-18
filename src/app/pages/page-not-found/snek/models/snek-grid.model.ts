import { SnekGridNode } from './snek-grid-node.model';

export class SnekGrid {
	private readonly _grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;

	private constructor(
		private readonly _width: number,
		private readonly _height: number,
	) {
		this._grid = Array.from(Array(_height),
			() => Array.from(Array(_width),
				() => SnekGridNode.new()));
		this.initializeGridNodes();
	}

	public static new(width: number, height: number): SnekGrid {
		return new SnekGrid(width, height);
	}

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this._grid;
	}

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	public at(width: number, height: number): SnekGridNode {
		if (width < 0 || width > this._width || height < 0 || height > this._height) {
			return null;
		} else {
			return this._grid[height][width];
		}
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
}
