import { SnekGridNodeType } from './snek-grid-node-type.enum';

export class SnekGridNode {
	private _type: SnekGridNodeType;

	private _up: SnekGridNode;
	private _down: SnekGridNode;
	private _left: SnekGridNode;
	private _right: SnekGridNode;

	constructor() {
		this._type = SnekGridNodeType.BLANK;
	}

	public static new(): SnekGridNode {
		return new SnekGridNode();
	}

	public initialize(up: SnekGridNode, down: SnekGridNode, left: SnekGridNode, right: SnekGridNode): void {
		this._up = up;
		this._down = down;
		this._left = left;
		this._right = right;
	}
}
