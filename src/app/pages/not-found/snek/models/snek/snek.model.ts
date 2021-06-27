import { inverseDirection, SnekDirection } from 'src/app/pages/not-found/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/pages/not-found/snek/models/grid/snek-grid-node.model';
import { SnekNode } from 'src/app/pages/not-found/snek/models/snek/snek-node.model';

export class Snek {
	private _head: SnekNode;
	private _tail: SnekNode;
	private _length: number;
	private _currentDirection: SnekDirection;
	private _nextDirection: SnekDirection;

	private constructor(
		length: number,
		tailGridNode: SnekGridNode,
	) {
		this._head = this._tail = SnekNode.initialHead(tailGridNode);
		this._length = 1;
		this._currentDirection = SnekDirection.RIGHT;
		this._nextDirection = SnekDirection.RIGHT;

		for (let i = 1; i < length; i++) {
			this.addHead();
		}
	}

	public static new(length: number, tailGridNode: SnekGridNode): Snek {
		return new Snek(length, tailGridNode);
	}

	public move(): boolean {
		this._currentDirection = this._nextDirection;
		const nextSnekGridNode = this._head.snekGridNode.next(this._nextDirection);

		if (!(nextSnekGridNode instanceof SnekGridNode)) {
			throw new Error('come join me in the wall');
		}

		switch (nextSnekGridNode.type) {
			case SnekGridNodeType.BLANK:
				this.addHead();
				this.removeTail();
				return false;
			case SnekGridNodeType.FUD:
				this.addHead();
				return true;
			case SnekGridNodeType.SNEK:
				throw new Error('stop hitting yourself');
		}
	}

	private addHead(): void {
		const nextSnekGridNode = this._head.snekGridNode.next(this._nextDirection);
		this._head = SnekNode.newHead(nextSnekGridNode, this._head, this._nextDirection);
		this._length++;
	}

	private removeTail(): void {
		this._tail.snekGridNode.detachSnekNode();
		const newTail = this._tail.parent;
		newTail.removeTail();
		this._tail = newTail;
		this._length--;
	}

	public get head(): SnekNode {
		return this._head;
	}

	public get length(): number {
		return this._length;
	}

	public get direction(): SnekDirection {
		return this._currentDirection;
	}

	public set direction(direction: SnekDirection) {
		if (this._currentDirection !== inverseDirection(direction)) {
			this._nextDirection = direction;
		}
	}
}
