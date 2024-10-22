import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekNode } from 'src/app/features/snek/models/snek/snek-node.model';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';

export class SnekGridNode {

	#up!: SnekGridNode | null;
	#down!: SnekGridNode | null;
	#left!: SnekGridNode | null;
	#right!: SnekGridNode | null;

	#type = SnekGridNodeType.BLANK;
	#snekNode: SnekNode | null = null;

	private constructor(
		public readonly width: number,
		public readonly height: number,
	) { }

	public static new(width: number, height: number): SnekGridNode {
		return new SnekGridNode(width, height);
	}

	public initialize(up: SnekGridNode | null, down: SnekGridNode | null, left: SnekGridNode | null, right: SnekGridNode | null): void {
		this.#up = up;
		this.#down = down;
		this.#left = left;
		this.#right = right;
	}

	public attachSnekNode(snekNode: SnekNode): void {
		this.#snekNode = snekNode;
		this.#type = SnekGridNodeType.SNEK;
	}

	public attachFood(): void {
		this.detachSnekNode();
		this.#type = SnekGridNodeType.FOOD;
	}

	public detachSnekNode(): void {
		this.#snekNode = null;
		this.#type = SnekGridNodeType.BLANK;
	}

	public next(direction: SnekDirection): SnekGridNode | null {
		switch (direction) {
			case SnekDirection.UP:
				return this.#up;
			case SnekDirection.DOWN:
				return this.#down;
			case SnekDirection.LEFT:
				return this.#left;
			case SnekDirection.RIGHT:
				return this.#right;
		}
	}

	public getIcon(gameCounter: number): SnekIcon | null {
		switch (this.#type) {
			case SnekGridNodeType.SNEK:
				return this.#snekNode?.getIcon(gameCounter) ?? null;
			case SnekGridNodeType.FOOD:
				return SnekIcon.FOOD;
			case SnekGridNodeType.BLANK:
				return null;
		}
	}

	public get type(): SnekGridNodeType {
		return this.#type;
	}

	public get snekNode(): SnekNode | null {
		return this.#snekNode;
	}
}
