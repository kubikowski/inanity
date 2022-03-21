import { combineLatest, Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { map } from 'rxjs/operators';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNodeType } from 'src/app/features/snek/models/snek/snek-node-type.enum';

export class SnekNode {
	private _parent: SnekNode | null = null;

	@Observed() private parentDirection: SnekDirection | null = null;
	@Observed() private childDirection: SnekDirection | null;

	public readonly parentDirection$!: Observable<SnekDirection>;
	public readonly childDirection$!: Observable<SnekDirection>;

	public readonly type$: Observable<SnekNodeType>;

	private constructor(
		public readonly snekGridNode: SnekGridNode,
		private _child: SnekNode | null,
		childDirection: SnekDirection | null,
	) {
		snekGridNode.attachSnekNode(this);

		this.childDirection = childDirection;

		if (this._child instanceof SnekNode) {
			this._child.addHead(this);
		}

		this.type$ = combineLatest([ this.parentDirection$, this.childDirection$ ])
			.pipe(map(([ _parentDirection, _childDirection ]) => SnekNodeType.from(_parentDirection, _childDirection, this.child)));
	}

	public static initialHead(snekGridNode: SnekGridNode): SnekNode {
		return new SnekNode(snekGridNode, null, null);
	}

	public static newHead(snekGridNode: SnekGridNode, child: SnekNode, nextDirection: SnekDirection): SnekNode {
		const childDirection = SnekDirection.inverse(nextDirection);

		return new SnekNode(snekGridNode, child, childDirection);
	}

	public get parent(): SnekNode | null {
		return this._parent;
	}

	public get child(): SnekNode | null {
		return this._child;
	}

	public addHead(head: SnekNode): void {
		if (this._parent instanceof SnekNode) {
			throw new Error('be like the hydra');
		}

		this._parent = head;
		this.parentDirection = SnekDirection.inverse(head.childDirection);
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			throw new Error('if i had a tail');
		}

		this._child = null;
		this.childDirection = null;
	}
}
