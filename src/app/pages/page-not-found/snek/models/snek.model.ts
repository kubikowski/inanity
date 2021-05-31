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

	public legs(): boolean {
		this._currentDirection = this._nextDirection;
		const nextSnekGridNode = this._head.snekGridNode.next(this._nextDirection);

		if (!(nextSnekGridNode instanceof SnekGridNode)) {
			throw new Error('hit a wall');
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
				throw new Error('hit yourself');
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

	get length(): number {
		return this._length;
	}

	set direction(direction: SnekDirection) {
		if (this._currentDirection !== inverseDirection(direction)) {
			this._nextDirection = direction;
		}
	}
}
