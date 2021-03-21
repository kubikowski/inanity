import { inverseDirection, SnekDirection } from './snek-direction.enum';
import { SnekNode } from './snek-node.model';
import { SnekGridNode } from './snek-grid-node.model';
import { SnekGridNodeType } from './snek-grid-node-type.enum';

export class Snek {
	private _head: SnekNode;
	private _tail: SnekNode;
	private _length: number;
	private _currentDirection: SnekDirection;
	private _nextDirection: SnekDirection;

	private constructor(
		length: number
	) {
		this._head = this._tail = SnekNode.initialHead();
		this._length = 1;
		this._currentDirection = SnekDirection.RIGHT;
		this._nextDirection = SnekDirection.RIGHT;

		for (let i = 1; i < length; i++) {
			this.addHead();
		}
	}

	public static new(length): Snek {
		return new Snek(length);
	}

	get head(): SnekNode {
		return this._head;
	}

	get tail(): SnekNode {
		return this._tail;
	}

	get length(): number {
		return this._length;
	}

	set direction(direction: SnekDirection) {
		if (this._currentDirection !== inverseDirection(direction)) {
			this._nextDirection = direction;
		}
	}

	public move(): void {
		this._currentDirection = this._nextDirection;
		const nextSnekGridNode = this._head.snekGridNode.next(this._nextDirection);

		if (!(nextSnekGridNode instanceof SnekGridNode)) {
			throw new Error('hit a wall');
		}

		switch (nextSnekGridNode.type) {
			case SnekGridNodeType.BLANK:
				this.addHead();
				this.removeTail();
				break;
			case SnekGridNodeType.FUD:
				this.addHead();
				break;
			case SnekGridNodeType.SNEK:
				throw new Error('hit yourself');
		}
	}

	private addHead(): void {
		this._head = SnekNode.newHead(this._head, this._nextDirection);
		this._length++;
	}

	private removeTail(): void {
		const newTail = this._tail.parent;
		this._tail.removeTail();
		this._tail = newTail;
		this._length--;
	}
}
