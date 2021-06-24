import { Observable } from 'rxjs';
import { SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { SnekNode } from 'src/app/pages/not-found/snek/models/snek-node.model';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

export class SnekGridNode {
	@Observed() public type = SnekGridNodeType.BLANK;
	@Observed() private snekNode: SnekNode = null;
	private _up: SnekGridNode;
	private _down: SnekGridNode;
	private _left: SnekGridNode;
	private _right: SnekGridNode;

	public readonly type$: Observable<SnekGridNodeType>;
	public readonly snekNode$: Observable<SnekNode>;

	private constructor(
		private _width: number,
		private _height: number,
	) { }

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
		this.snekNode = snekNode;
		this.type = SnekGridNodeType.SNEK;
	}

	public attachFud(): void {
		this.detachSnekNode();
		this.type = SnekGridNodeType.FUD;
	}

	public detachSnekNode(): void {
		this.snekNode = null;
		this.type = SnekGridNodeType.BLANK;
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
			default:
				console.error('you are going nowhere:', direction);
		}
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}
}
