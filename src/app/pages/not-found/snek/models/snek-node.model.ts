import { Observable } from 'rxjs';
import { inverseDirection, SnekDirection } from 'src/app/pages/not-found/snek/models/snek-direction.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/snek-grid-node.model';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

export class SnekNode {
	private _parent: SnekNode = null;

	@Observed() private parentDirection: SnekDirection = null;
	@Observed() private childDirection: SnekDirection;

	public readonly parentDirection$: Observable<SnekDirection>;
	public readonly childDirection$: Observable<SnekDirection>;

	private constructor(
		public readonly snekGridNode: SnekGridNode,
		private _child: SnekNode,
		childDirection: SnekDirection,
	) {
		snekGridNode.attachSnekNode(this);

		this.childDirection = childDirection;

		if (this._child instanceof SnekNode) {
			this._child.addHead(this);
		}
	}

	public static initialHead(snekGridNode: SnekGridNode): SnekNode {
		return new SnekNode(snekGridNode, null, null);
	}

	public static newHead(snekGridNode: SnekGridNode, child: SnekNode, nextDirection: SnekDirection): SnekNode {
		const childDirection = inverseDirection(nextDirection);

		return new SnekNode(snekGridNode, child, childDirection);
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
