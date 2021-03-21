import { SnekGridNode } from './snek-grid-node.model';
import { inverseDirection, SnekDirection } from './snek-direction.enum';

export class SnekNode {
	private _snekGridNode: SnekGridNode;
	private _parent: SnekNode;
	private _child: SnekNode;
	private _parentDirection: SnekDirection;
	private _childDirection: SnekDirection;

	private constructor(
		child: SnekNode,
		direction: SnekDirection,
	) {
		this._parent = null;
		this._parentDirection = null;

		this._child = child;
		this._childDirection = inverseDirection(direction);
		if (this._child instanceof SnekNode) {
			this._child.addHead(this);
		}
	}

	public static initialHead(): SnekNode {
		return new SnekNode(null, null);
	}

	public static newHead(child: SnekNode, direction: SnekDirection): SnekNode {
		return new SnekNode(child, direction);
	}

	public attachSnekGridNode(snekGridNode: SnekGridNode): void {
		if (this._snekGridNode instanceof SnekGridNode) {
			console.error('snek den', this);
		}

		this._snekGridNode = snekGridNode;
	}

	get snekGridNode(): SnekGridNode {
		return this._snekGridNode;
	}

	get parent(): SnekNode {
		return this._parent;
	}

	get child(): SnekNode {
		return this._child;
	}

	get parentDirection(): SnekDirection {
		return this._parentDirection;
	}

	get childDirection(): SnekDirection {
		return this._childDirection;
	}

	public addHead(head: SnekNode): void {
		if (this._parent instanceof SnekNode) {
			console.error('hydra', this);
		}

		this._parent = head;
		this._parentDirection = inverseDirection(head._childDirection);
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			console.error('ouroboros', this);
		}

		this._child = null;
		this._childDirection = null;
	}
}
