import { intercept } from 'src/app/core/functions/json/intercept.funtion';
import { SnekDirection } from 'src/app/features/snek/models/direction/snek-direction.enum';
import { GridNode } from 'src/app/features/snek/models/grid/snek-grid-node.model';
import { SnekGameState } from 'src/app/features/snek/models/state/snek-game-state.model';

export abstract class SnekPackingUtil {

	// region Pack State
	public static packState(state: SnekGameState): string {
		const score = SnekPackingUtil.packInt(state.score);
		const counter = SnekPackingUtil.packInt(state.counter);
		const head = SnekPackingUtil.packNode(state.headNode);
		const tail = SnekPackingUtil.packNode(state.tailNode);
		const food = SnekPackingUtil.packNode(state.foodNode);
		const direction = SnekPackingUtil.toTwoBitDirection(state.direction);

		return `${ score }${ counter }${ head }${ tail }${ food }${ direction }`;
	}

	public static unpackState(packedState: string): SnekGameState {
		const score = SnekPackingUtil.unpackInt(packedState.at(0)!);
		const counter = SnekPackingUtil.unpackInt(packedState.at(1)!);
		const head = SnekPackingUtil.unpackNode(packedState.at(2)!);
		const tail = SnekPackingUtil.unpackNode(packedState.at(3)!);
		const food = SnekPackingUtil.unpackNode(packedState.at(4)!);
		const direction = SnekPackingUtil.fromTwoBitDirection(+packedState.at(5)! as (0 | 1 | 2 | 3));

		return SnekGameState.of(score, counter, head, tail, food, direction);
	}

	public static packInt(int: number): string {
		return String.fromCharCode(int);
	}

	public static unpackInt(char: string): number {
		return char.charCodeAt(0);
	}

	public static packNode(snekGridNode: GridNode): string {
		const { width, height } = snekGridNode;

		return String.fromCharCode((width << 8) | height);
	}

	public static unpackNode(packedNode: string): GridNode {
		const charCode = packedNode.charCodeAt(0);
		const width = charCode >>> 8;
		const height = charCode & 0x00FF;

		return { width, height };
	}
	// endregion Pack State


	// region Pack Directions
	public static validateDirections(directions: SnekDirection[]): string {
		const packedDirections = SnekPackingUtil.packDirections(directions);
		const unpackedDirections = SnekPackingUtil.unpackDirections(packedDirections);
		const discrepancies = new Map<number, [ SnekDirection, SnekDirection ]>();

		for (let index = 0; index < directions.length; index++) {
			const direction = directions[index]!;
			const unpackedDirection = unpackedDirections[index]!;

			if (direction !== unpackedDirection) {
				discrepancies.set(index, [ direction, unpackedDirection ]);
			}
		}

		console.log('packing discrepancies:', intercept(discrepancies));
		return packedDirections;
	}

	/**
	 * We can store individual directions in 2 bits apiece.
	 * And each char of the encoded output string is a 16 bit Unicode char.
	 * Therefore, each char output can store an 8 direction block.
	 *
	 * ---
	 *
	 * However, there is a potential commonly occurring flaw in Unicode encoding.
	 * Which could produce a lower density packing output than expected.
	 *
	 * - `\u0000 - \u001F` are ascii control characters.
	 * - `\uFFF0 - \uFFFF` are ascii reserved 'special' characters.
	 * - `\uE000 - \uF8FF` are 'private use area' reserved characters.
	 * These potentially cannot stringify as single chars, but instead as these 6 char `\uXXXX` strings.
	 * For more information: https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane
	 *
	 * And these are a fairly common occurrence:
	 * - 6 contiguous counts of `Direction.UP (0b00)` encode a control character.
	 * - 6 contiguous counts of `Direction.RIGHT (0b11)` encode a reserved or special character.
	 *
	 * So, to account for this, we would need optional handling for lower density encoded chars.
	 * - If a block would encode `<= 0x003F`, we instead output a 5 direction block of `0x003F ('?')`.
	 * - If a block would encode `>= 0xFFEF`, we instead output a 6 direction block of `0xFFEF`.
	 * - If a block would encode `>= 0xE000`, we need to repack the block, starting after `0xF900 ('豈')`.
	 *   To do so, we know the first direction is `0b11`, then we pack 4 fixed bits of `0b1110`,
	 *   which gets us to `0xF900 ('豈')`. Then we can pack 5 more directions up to `0xFBFF ('ﯿ')`.
	 *
	 * The caveat to these control sequence overrides is that directions would need to be
	 * encoded in highest to lowest bit order. So the first direction in the block
	 * is stored on the highest 2 bits, and the 8th direction on the lowest 2.
	 */
	public static packDirections(directions: SnekDirection[]): string {
		const twoBitDirections = directions.map(direction => this.toTwoBitDirection(direction));
		const sixteenBitBlocks = <number[]>[];

		for (let blockIndex = 0, length = twoBitDirections.length; blockIndex < length; blockIndex += 8) {
			const block = twoBitDirections.slice(blockIndex, blockIndex + 8);
			let packedBlock = 0;

			for (let packingIndex = 0; packingIndex < 8; packingIndex++) {
				const packedDirection = block[packingIndex]! << (packingIndex * 2);
				packedBlock = packedBlock | packedDirection;
			}

			sixteenBitBlocks.push(packedBlock);

			// if (packedBlock <= 0x003F) {
			// 	sixteenBitBlocks.push(0x003F);
			// 	blockIndex += 5;
			// } else if (packedBlock >= 0xFFEF) {
			// 	sixteenBitBlocks.push(0xFFEF);
			// 	blockIndex += 6;
			// }
		}

		return String.fromCharCode(...sixteenBitBlocks);
	}

	public static unpackDirections(packedDirections: string): SnekDirection[] {
		const directions: SnekDirection[] = [];

		for (let blockIndex = 0, length = packedDirections.length; blockIndex < length; blockIndex++) {
			const packedBlock = packedDirections.charCodeAt(blockIndex);

			// if (packedBlock === 0x003F) {
			// 	directions.push(...Array.from({ length: 5 }).map(() => SnekDirection.UP));
			// 	continue;
			// } else if (packedBlock === 0xFFEF) {
			// 	directions.push(...Array.from({ length: 6 }).map(() => SnekDirection.RIGHT));
			// 	continue;
			// }

			for (let packingIndex = 0; packingIndex < 8; packingIndex++) {
				const twoBitDirection = (packedBlock << (30 - (packingIndex * 2))) >>> 30;
				directions.push(this.fromTwoBitDirection(twoBitDirection as (0 | 1 | 2 | 3)));
			}
		}

		return directions;
	}

	/**
	 * Given that there are 4 directions, we could store a direction in 2 bits.
	 * Or, adding nullability into account, we could store a direction in 4 bits.
	 * I don't much care to account for nullability here, so 2 bits it is.
	 */
	public static toTwoBitDirection(direction: SnekDirection): 0 | 1 | 2 | 3 {
		switch (direction) {
			case SnekDirection.UP:
				return 0b00;
			case SnekDirection.LEFT:
				return 0b01;
			case SnekDirection.DOWN:
				return 0b10;
			case SnekDirection.RIGHT:
				return 0b11;
		}
	}

	public static fromTwoBitDirection(direction: 0 | 1 | 2 | 3): SnekDirection {
		switch (direction) {
			case 0b00:
				return SnekDirection.UP;
			case 0b01:
				return SnekDirection.LEFT;
			case 0b10:
				return SnekDirection.DOWN;
			case 0b11:
				return SnekDirection.RIGHT;
		}
	}
	// endregion Pack Directions
}
