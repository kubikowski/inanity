import { SnekDirection } from './snek-direction.enum';
import { SnekNode } from './snek-node.model';

export class Snek {
	private _head: SnekNode;
	private _tail: SnekNode;
	private _length: number;

	private constructor(
		length: number
	) {
		this._head = this._tail = SnekNode.initialHead();
		this._length = 1;

		for (let i = 1; i < length; i++) {
			this.addHead(SnekDirection.RIGHT);
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

	public addHead(direction: SnekDirection): void {
		this._head = SnekNode.newHead(this._head, direction);
		this._length++;
	}

	public removeTail(): void {
		const newTail = this._tail.parent;
		this._tail.removeTail();
		this._tail = newTail;
		this._length--;
	}
}
