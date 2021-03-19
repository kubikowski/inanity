import { SnekGridNodeType } from './snek-grid-node-type.enum';
import { SnekNode } from './snek-node.model';
import { SnekDirection } from './snek-direction.enum';

export class SnekGridNode {
	private _type: SnekGridNodeType;
	private _snekNode: SnekNode;

	private _up: SnekGridNode;
	private _down: SnekGridNode;
	private _left: SnekGridNode;
	private _right: SnekGridNode;

	private constructor(
		private _width: number,
		private _height: number,
	) {
		this._type = SnekGridNodeType.BLANK;
	}

	public static new(width: number, height: number): SnekGridNode {
		return new SnekGridNode(width, height);
	}

	public initialize(up: SnekGridNode, down: SnekGridNode, left: SnekGridNode, right: SnekGridNode): void {
		this._up = up;
		this._down = down;
		this._left = left;
		this._right = right;
	}

	public attachSnekNode(snekNode: SnekNode): void {
		this._snekNode = snekNode;
		this._type = SnekGridNodeType.SNEK;
	}

	get type(): SnekGridNodeType {
		return this._type;
	}

	get snekNode(): SnekNode {
		return this._snekNode;
	}

	public next(direction: SnekDirection): SnekGridNode {
		switch (direction) {
			case SnekDirection.UP:
				return this._up;
			case SnekDirection.DOWN:
				return this._down;
			case SnekDirection.LEFT:
				return this._left;
			case SnekDirection.RIGHT:
				return this._right;
		}
	}
}
