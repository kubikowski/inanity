import { Snek } from './snek.model';
import { SnekGridNode } from './snek-grid-node.model';

export class SnekGame {
	private readonly _grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;
	private readonly _snek: Snek;

	private constructor(
		private readonly _width: number,
		private readonly _height: number,
	) {
		this._grid = Array.from(Array(_height),
			(row, height) => Array.from(Array(_width),
				(node, width) => SnekGridNode.new(width, height)));
		this.initializeGridNodes();

		const tailGridNode = this.at(1, Math.floor(this._height / 2));
		this._snek = Snek.new(3, tailGridNode);
	}

	public static new(width: number, height: number): SnekGame {
		return new SnekGame(width, height);
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

	private at(width: number, height: number): SnekGridNode {
		if (width >= 0 && width < this._width && height >= 0 && height < this._height) {
			return this._grid[height][width];
		} else {
			return null;
		}
	}

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this._grid;
	}

	public get snek(): Snek {
		return this._snek;
	}
}
