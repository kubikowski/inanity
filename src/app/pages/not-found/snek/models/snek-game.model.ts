import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';
import { Snek } from 'src/app/pages/not-found/snek/models/snek.model';

export class SnekGame {
	private readonly _grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;
	private readonly _snek: Snek;

	private constructor(
		private readonly _width: number,
		private readonly _height: number,
		initialSnekLength: number,
	) {
		this._grid = Array.from(Array(_height),
			(row, height) => Array.from(Array(_width),
				(node, width) => SnekGridNode.new(width, height)));
		this.initializeGridNodes();

		const tailGridNode = this.at(1, Math.floor(this._height / 2));
		this._snek = Snek.new(initialSnekLength, tailGridNode);

		this.spawnFud();
	}

	public static new(width: number, height: number, initialSnekLength: number): SnekGame {
		return new SnekGame(width, height, initialSnekLength);
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

	public snekLegs(): void {
		if (this.snek.legs()) {
			this.spawnFud();
		}
	}

	private spawnFud(): void {
		this.findBlankGridNode()
			.attachFud();
	}

	private findBlankGridNode(): SnekGridNode {
		const randomIndex = Math.floor(Math.random() * ((this._width * this._height) - this._snek.length));
		let currentSnekGridNode = this.at(0, 0);
		for (let currentIndex = 0; currentIndex < randomIndex; currentIndex++) {
			currentSnekGridNode = this.findNextBlankGridNode(currentSnekGridNode);
		}
		return currentSnekGridNode;
	}

	private findNextBlankGridNode(snekGridNode: SnekGridNode): SnekGridNode {
		const nextGridNode = (snekGridNode.width + 1 === this._width)
			? this.at(0, snekGridNode.height + 1)
			: snekGridNode.next(SnekDirection.RIGHT);
		return (nextGridNode.type === SnekGridNodeType.BLANK)
			? nextGridNode
			: this.findNextBlankGridNode(nextGridNode);
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
