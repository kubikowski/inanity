import { computed, signal, untracked } from '@angular/core';
import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNodeTypeUtil } from 'src/app/features/snek/models/snek/snek-node-type.enum';

export class SnekNode {
	private _parent: SnekNode | null = null;

	private readonly parentDirection = signal<SnekDirection | null>(null);
	private readonly childDirection = signal<SnekDirection | null>(null);

	public readonly type = computed(
		() => SnekNodeTypeUtil.from(this.parentDirection(), this.childDirection()));

	public readonly direction = computed(
		() => SnekDirectionUtil.nodeDirection(this.parentDirection(), this.childDirection()));

	private constructor(
		public readonly snekGridNode: SnekGridNode,
		private _child: SnekNode | null,
		childDirection: SnekDirection | null,
	) {
		snekGridNode.attachSnekNode(this);

		this.childDirection.set(childDirection);

		if (this._child instanceof SnekNode) {
			this._child.addHead(this);
		}
	}

	public static initialHead(snekGridNode: SnekGridNode): SnekNode {
		return new SnekNode(snekGridNode, null, null);
	}

	public static newHead(snekGridNode: SnekGridNode, child: SnekNode, nextDirection: SnekDirection): SnekNode {
		const childDirection = SnekDirectionUtil.inverse(nextDirection);

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
		this.parentDirection.set(SnekDirectionUtil.inverse(untracked(head.childDirection)));
	}

	public removeTail(): void {
		if (!(this._child instanceof SnekNode)) {
			throw new Error('if i had a tail');
		}

		this._child = null;
		this.childDirection.set(null);
	}
}
