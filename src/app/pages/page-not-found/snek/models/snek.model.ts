import { SnekNode } from './snek-node.model';

export class Snek {
	private _head: SnekNode;
	private _tail: SnekNode;

	private constructor(
		private _length: number,
	) {
		this._tail = SnekNode.new(null);
		this._head = this._tail;

		for (let i = 1; i < _length; i++) {
			this.addHead();
		}
	}

	public static new(length): Snek {
		return new Snek(length);
	}

	public addHead(): void {
		const newHead = SnekNode.new(this._head);
		this._head.addHead(newHead);
		this._head = newHead;
	}

	public removeTail(): void {
		const newTail = this._tail.parent;
		this._tail.removeTail();
		this._tail = newTail;
	}
}
