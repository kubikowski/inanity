import { Observable } from 'rxjs';
import { inverseDirection, SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

export class SnekNode {
	private readonly _snekGridNode: SnekGridNode;
	private _parent: SnekNode;
	private _child: SnekNode;

	@Observed() private parentDirection: SnekDirection = null;
	@Observed() private childDirection: SnekDirection = null;

	public readonly parentDirection$: Observable<SnekDirection>;
	public readonly childDirection$: Observable<SnekDirection>;

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
		this.parentDirection = null;

		this._child = child;
		this.childDirection = inverseDirection(direction);

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

	public addHead(head: SnekNode): void {
		if (this._parent instanceof SnekNode) {
			throw new Error('hydra');
		}

		this._parent = head;
		this.parentDirection = inverseDirection(head.childDirection);
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			throw new Error('ouroboros');
		}

		this._child = null;
		this.childDirection = null;
	}
}
