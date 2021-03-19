import { SnekGridNode } from './snek-grid-node.model';

export class SnekNode {
	private _snekGridNode: SnekGridNode;

	private _parent: SnekNode;
	private _child: SnekNode;

	private constructor(
		child: SnekNode,
	) {
		this._parent = null;
		this._child = child;
	}

	public static new(child: SnekNode): SnekNode {
		return new SnekNode(child);
	}

	public attachSnekGridNode(snekGridNode: SnekGridNode): void {
		if (this._snekGridNode instanceof SnekGridNode) {
			console.error('snek den', this);
		}

		this._snekGridNode = snekGridNode;
	}

	get parent(): SnekNode {
		return this._parent;
	}

	get child(): SnekNode {
		return this._child;
	}

	public addHead(head: SnekNode): void {
		if (this._parent instanceof SnekNode) {
			console.error('hydra', this);
		}

		this._parent = head;
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			console.error('ouroboros', this);
		}

		this._child = null;
	}
}
