import { signal, untracked } from '@angular/core';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { Snek } from 'src/app/features/snek/models/snek/snek.model';

export class SnekGame {
	public static readonly initialSnekLength = 3;

	private readonly _grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;
	private readonly _snek: Snek;
	private _fudNode!: SnekGridNode;
	private _counter = 0;

	private readonly _gameOver = signal<string | undefined>(undefined);
	public readonly gameOver = this._gameOver.asReadonly();

	private constructor(
		private readonly _width: number,
		private readonly _height: number,
	) {
		this._grid = Array.from(Array(this._height),
			(_row, height) => Array.from(Array(this._width),
				(_node, width) => SnekGridNode.new(width, height)));
		this.initializeGridNodes();

		const tailGridNode = this.at(1, Math.floor(this._height / 2)) as SnekGridNode;
		this._snek = Snek.new(SnekGame.initialSnekLength, tailGridNode);

		this.spawnFud();
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

	public moveSnek(): void {
		try {
			this._counter++;
			if (this.snek.move()) {
				this.spawnFud();
			}
		} catch (error) {
			this._gameOver.set((error as Error).message);
		}
	}

	private spawnFud(): void {
		this._fudNode = this.findBlankGridNode();
		this._fudNode.attachFud();
	}

	private findBlankGridNode(): SnekGridNode {
		const randomIndex = Math.floor(Math.random() * ((this._width * this._height) - this._snek.length));
		let currentSnekGridNode = this.at(0, 0) as SnekGridNode;
		for (let currentIndex = 0; currentIndex < randomIndex; currentIndex++) {
			currentSnekGridNode = this.findNextBlankGridNode(currentSnekGridNode);
		}
		return currentSnekGridNode;
	}

	private findNextBlankGridNode(snekGridNode: SnekGridNode): SnekGridNode {
		const nextGridNode = (snekGridNode.width + 1 === this._width)
			? this.at(0, snekGridNode.height + 1) as SnekGridNode
			: snekGridNode.next(SnekDirection.RIGHT) as SnekGridNode;

		return (untracked(nextGridNode.type) === SnekGridNodeType.BLANK)
			? nextGridNode
			: this.findNextBlankGridNode(nextGridNode);
	}

	private at(width: number, height: number): SnekGridNode | null {
		return this._grid?.[height]?.[width] ?? null;
	}

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this._grid;
	}

	public get snek(): Snek {
		return this._snek;
	}

	public get fudNode(): SnekGridNode {
		return this._fudNode;
	}

	public get counter(): number {
		return this._counter;
	}
}
