import { Random } from 'src/app/core/functions/number/random.function';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { SnekGridNodeType } from 'src/app/features/snek/models/grid/snek-grid-node-type.enum';
import { SnekGridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { Snek } from 'src/app/features/snek/models/snek/snek.model';

export class SnekGame {
	public static readonly initialSnekLength = 3;

	readonly #seed = Math.floor(Math.random() * 0x10000);
	readonly #random = Random.seeded(this.#seed);

	readonly #width: number;
	readonly #height: number;
	readonly #grid: ReadonlyArray<ReadonlyArray<SnekGridNode>>;
	readonly #snek: Snek;

	#foodNode!: SnekGridNode;
	#counter = 0;
	#gameOver: string | null = null;

	private constructor(
		width: number,
		height: number,
	) {
		this.#width = width;
		this.#height = height;
		this.#grid = Array.from(Array(this.#height),
			(_row, _height) => Array.from(Array(this.#width),
				(_node, _width) => SnekGridNode.new(_width, _height)));
		this.initializeGridNodes();

		const tailGridNode = this.at(1, Math.floor(this.#height / 2)) as SnekGridNode;
		this.#snek = Snek.new(SnekGame.initialSnekLength, tailGridNode);

		this.spawnFood();
	}

	public static new(width: number, height: number): SnekGame {
		return new SnekGame(width, height);
	}

	private initializeGridNodes(): void {
		this.#grid.forEach((gridRow, height) => {
			gridRow.forEach((gridLocation, width) => {
				const up = this.at(width, height - 1);
				const down = this.at(width, height + 1);
				const left = this.at(width - 1, height);
				const right = this.at(width + 1, height);
				gridLocation.initialize(up, down, left, right);
			});
		});
	}

	public moveSnek(): void {
		try {
			this.#counter++;
			if (this.snek.move()) {
				this.spawnFood();
			}
		} catch (error) {
			this.#gameOver = (error as Error).message;
		}
	}

	private spawnFood(): void {
		this.#foodNode = this.findBlankGridNode();
		this.#foodNode.attachFood();
	}

	private findBlankGridNode(): SnekGridNode {
		const randomIndex = this.#random.uniform(0, this.#width * this.#height);
		const height = Math.floor(randomIndex / this.#width);
		const width = randomIndex % this.#width;

		return this.validateBlankGridNode(this.at(width, height));
	}

	private findNextBlankGridNode(snekGridNode: SnekGridNode | null): SnekGridNode {
		const nextGridNode = this.findNextGridNode(snekGridNode);
		return this.validateBlankGridNode(nextGridNode);
	}

	private findNextGridNode(snekGridNode: SnekGridNode | null): SnekGridNode {
		if (snekGridNode !== null && snekGridNode.width + 1 < this.#width) {
			return snekGridNode.next(SnekDirection.RIGHT) as SnekGridNode;
		} else if (snekGridNode !== null && snekGridNode.height + 1 < this.#height) {
			return this.at(0, snekGridNode.height + 1) as SnekGridNode;
		} else {
			return this.at(0, 0) as SnekGridNode;
		}
	}

	private validateBlankGridNode(snekGridNode: SnekGridNode | null): SnekGridNode {
		if (snekGridNode !== null && snekGridNode.type === SnekGridNodeType.BLANK) {
			return snekGridNode;
		} else {
			return this.findNextBlankGridNode(snekGridNode);
		}
	}

	private at(width: number, height: number): SnekGridNode | null {
		return this.#grid?.[height]?.[width] ?? null;
	}

	public get seed(): number {
		return this.#seed;
	}

	public get grid(): ReadonlyArray<ReadonlyArray<SnekGridNode>> {
		return this.#grid;
	}

	public get snek(): Snek {
		return this.#snek;
	}

	public get foodNode(): SnekGridNode {
		return this.#foodNode;
	}

	public get counter(): number {
		return this.#counter;
	}

	public get gameOver(): string | null {
		return this.#gameOver;
	}
}
