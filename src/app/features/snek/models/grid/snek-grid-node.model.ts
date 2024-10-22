import { signal } from '@angular/core';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekNode } from 'src/app/features/snek/models/snek/snek-node.model';

export class SnekGridNode {
	public readonly type = signal(SnekGridNodeType.BLANK);
	public readonly snekNode = signal<SnekNode | null>(null);

	private _up!: SnekGridNode | null;
	private _down!: SnekGridNode | null;
	private _left!: SnekGridNode | null;
	private _right!: SnekGridNode | null;

	private constructor(
		public readonly width: number,
		public readonly height: number,
	) { }

	public static new(width: number, height: number): SnekGridNode {
		return new SnekGridNode(width, height);
	}

	public initialize(up: SnekGridNode | null, down: SnekGridNode | null, left: SnekGridNode | null, right: SnekGridNode | null): void {
		this._up = up;
		this._down = down;
		this._left = left;
		this._right = right;
	}

	public attachSnekNode(snekNode: SnekNode): void {
		this.snekNode.set(snekNode);
		this.type.set(SnekGridNodeType.SNEK);
	}

	public attachFood(): void {
		this.detachSnekNode();
		this.type.set(SnekGridNodeType.FOOD);
	}

	public detachSnekNode(): void {
		this.snekNode.set(null);
		this.type.set(SnekGridNodeType.BLANK);
	}

	public next(direction: SnekDirection): SnekGridNode | null {
		switch (direction) {
			case SnekDirection.UP:
				return this._up;
			case SnekDirection.DOWN:
				return this._down;
			case SnekDirection.LEFT:
				return this._left;
			case SnekDirection.RIGHT:
				return this._right;
		}
	}
}
