import { untracked } from '@angular/core';
import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNode } from 'src/app/features/snek/models/snek/snek-node.model';

export class Snek {

	#head: SnekNode;
	#tail: SnekNode;
	#length: number;

	#currentDirection: SnekDirection;
	#nextDirection: SnekDirection;

	private constructor(
		length: number,
		tailGridNode: SnekGridNode,
	) {
		this.#head = this.#tail = SnekNode.initialHead(tailGridNode);
		this.#length = 1;
		this.#currentDirection = SnekDirection.RIGHT;
		this.#nextDirection = SnekDirection.RIGHT;

		for (let index = this.#length; index < length; index++) {
			this.addHead();
		}
	}

	public static new(length: number, tailGridNode: SnekGridNode): Snek {
		return new Snek(length, tailGridNode);
	}

	public move(): boolean {
		this.#currentDirection = this.#nextDirection;
		const nextSnekGridNode = this.#head.snekGridNode.next(this.#nextDirection);

		if (!(nextSnekGridNode instanceof SnekGridNode)) {
			throw new Error('come join me in the wall');
		}

		switch (untracked(nextSnekGridNode.type)) {
			case SnekGridNodeType.BLANK:
				return this.moveOn();
			case SnekGridNodeType.FOOD:
				return this.moveOnUp();
			case SnekGridNodeType.SNEK:
				if (nextSnekGridNode === this.#tail.snekGridNode) {
					return this.moveOn();
				} else {
					throw new Error('stop hitting yourself');
				}
		}
	}

	private moveOn(): false {
		this.removeTail();
		this.addHead();
		return false;
	}

	private moveOnUp(): true {
		this.addHead();
		return true;
	}

	private addHead(): void {
		const nextSnekGridNode = this.#head.snekGridNode.next(this.#nextDirection) as SnekGridNode;

		this.#head = SnekNode.newHead(nextSnekGridNode, this.#head, this.#nextDirection);
		this.#length++;
	}

	private removeTail(): void {
		this.#tail.snekGridNode.detachSnekNode();

		const newTail = this.#tail.parent as SnekNode;
		newTail.removeTail();

		this.#tail = newTail;
		this.#length--;
	}

	public get head(): SnekNode {
		return this.#head;
	}

	public get tail(): SnekNode {
		return this.#tail;
	}

	public get length(): number {
		return this.#length;
	}

	public get direction(): SnekDirection {
		return this.#currentDirection;
	}

	public set direction(direction: SnekDirection) {
		if (this.#currentDirection !== SnekDirectionUtil.inverse(direction)) {
			this.#nextDirection = direction;
		}
	}
}
