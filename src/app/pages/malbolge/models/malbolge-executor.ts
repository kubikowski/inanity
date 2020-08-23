import { MaxTenTrit, MemorySlot, Trit } from './ternary.model';
import { CrazyLookup } from './lookup/crazy-lookup.constant';
import { EncryptionLookup } from './lookup/encryption-lookup.constant';

export class MalbolgeExecutor {
	/** Stores the memory and each of the registers used to execute a malbolge program.
	 * @param memory - The memory to
	 * @param a - accumulator, set to the value written by all
	 * 			  write operations on memory and used for standard I/O.
	 * @param c - code pointer, points to the current instruction.
	 * @param d - data pointer, automatically incremented after each instruction,
	 * 			  the location it points to is used for the data manipulation commands.
	 */
	public constructor(
		public memory: ReadonlyArray<MemorySlot> = Array(MaxTenTrit).fill(new MemorySlot()),
		public a: number = 0,
		public c: number = 0,
		public d: number = 0,
	) { }

	public static crazy(input1: Trit, input2: Trit): Trit {
		return CrazyLookup[input1][input2];
	}

	public static encipher(input: number): number {
		return EncryptionLookup[input % 94];
	}
}
