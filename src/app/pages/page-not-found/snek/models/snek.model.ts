import { SnekNode } from './snek-node.model';

export class Snek {
	private _head: SnekNode;
	private _tail: SnekNode;
	private _length: number;

	private constructor(
		length: number
	) {
		this._head = SnekNode.new(null);
		this._tail = this._head;
		this._length = 1;

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

	public addHead(): void {
		const newHead = SnekNode.new(this._head);
		this._head.addHead(newHead);
		this._head = newHead;
		this._length++;
	}

	public removeTail(): void {
		const newTail = this._tail.parent;
		this._tail.removeTail();
		this._tail = newTail;
		this._length--;
	}
}
