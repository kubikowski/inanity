import { Observable } from 'rxjs';
import { Observed } from 'src/app/core/decorators/observed.decorator';
import { inverseDirection, SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';

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
			throw new Error('be like the hydra');
		}

		this._parent = head;
		this.parentDirection = inverseDirection(head.childDirection);
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			throw new Error('if i had a tail');
		}

		this._child = null;
		this.childDirection = null;
	}
}
