import { inverseDirection, SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';

export class SnekNode {
	private readonly _snekGridNode: SnekGridNode;
	private _parent: SnekNode;
	private _child: SnekNode;
	private _parentDirection: SnekDirection;
	private _childDirection: SnekDirection;

	private constructor(
		snekGridNode: SnekGridNode,
		child: SnekNode,
		direction: SnekDirection,
	) {
		if (this._snekGridNode instanceof SnekGridNode) {
			throw new Error('out of bounds');
		}

		this._snekGridNode = snekGridNode;
		snekGridNode.attachSnekNode(this);

		this._parent = null;
		this._parentDirection = null;

		this._child = child;
		this._childDirection = inverseDirection(direction);

		if (this._child instanceof SnekNode) {
			this._child.addHead(this);
		}
	}

	public static initialHead(snekGridNode: SnekGridNode): SnekNode {
		return new SnekNode(snekGridNode, null, null);
	}

	public static newHead(snekGridNode: SnekGridNode, child: SnekNode, direction: SnekDirection): SnekNode {
		return new SnekNode(snekGridNode, child, direction);
	}

	public get snekGridNode(): SnekGridNode {
		return this._snekGridNode;
	}

	public get parent(): SnekNode {
		return this._parent;
	}

	public get child(): SnekNode {
		return this._child;
	}

	public get parentDirection(): SnekDirection {
		return this._parentDirection;
	}

	public get childDirection(): SnekDirection {
		return this._childDirection;
	}

	public addHead(head: SnekNode): void {
		if (this._parent instanceof SnekNode) {
			throw new Error('hydra');
		}

		this._parent = head;
		this._parentDirection = inverseDirection(head._childDirection);
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			throw new Error('ouroboros');
		}

		this._child = null;
		this._childDirection = null;
	}
}
