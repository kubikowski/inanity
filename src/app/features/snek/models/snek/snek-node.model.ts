import { SnekDirection, SnekDirectionUtil } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekNodeType, SnekNodeTypeUtil } from 'src/app/features/snek/models/snek/snek-node-type.enum';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';

export class SnekNode {
	#parent: SnekNode | null = null;
	#child: SnekNode | null;

	#parentDirection: SnekDirection | null = null;
	#childDirection: SnekDirection | null = null;

	#type = SnekNodeType.HEAD;
	#direction: SnekDirection | null = null;

	private constructor(
		public readonly snekGridNode: SnekGridNode,
		child: SnekNode | null,
		childDirection: SnekDirection | null,
	) {
		snekGridNode.attachSnekNode(this);

		this.#child = child;
		this.#childDirection = childDirection;
		this.updateMetadata();

		if (this.#child instanceof SnekNode) {
			this.#child.addHead(this);
		}
	}

	public static initialHead(snekGridNode: SnekGridNode): SnekNode {
		return new SnekNode(snekGridNode, null, null);
	}

	public static newHead(snekGridNode: SnekGridNode, child: SnekNode, nextDirection: SnekDirection): SnekNode {
		const childDirection = SnekDirectionUtil.inverse(nextDirection);

		return new SnekNode(snekGridNode, child, childDirection);
	}

	public addHead(head: SnekNode): void {
		if (this.#parent instanceof SnekNode) {
			throw new Error('be like the hydra');
		}

		this.#parent = head;
		this.#parentDirection = SnekDirectionUtil.inverse(head.#childDirection);
		this.updateMetadata();
	}

	public removeTail(): void {
		if (!(this.#child instanceof SnekNode)) {
			throw new Error('if i had a tail');
		}

		this.#child = null;
		this.#childDirection = null;
		this.updateMetadata();
	}

	private updateMetadata(): void {
		this.#type = SnekNodeTypeUtil.from(this.#parentDirection, this.#childDirection);
		this.#direction = SnekDirectionUtil.nodeDirection(this.#parentDirection, this.#childDirection);
	}

	public getIcon(gameCounter: number): SnekIcon {
		return SnekNodeTypeUtil.getIcon(this.#type, gameCounter);
	}

	public get parent(): SnekNode | null {
		return this.#parent;
	}

	public get child(): SnekNode | null {
		return this.#child;
	}

	public get type(): SnekNodeType {
		return this.#type;
	}

	public get direction(): SnekDirection | null {
		return this.#direction;
	}
}
