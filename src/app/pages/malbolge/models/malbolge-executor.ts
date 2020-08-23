import { MaxTenTrit, Trit } from './ternary.model';
import { MemorySlot } from './memory-slot';
import { CrazyLookup } from './lookup/crazy-lookup.constant';
import { EncipherLookup } from './lookup/encipher-lookup.constant';

export class MalbolgeExecutor {
	/** Stores the memory and each of the registers used to execute a malbolge program.
	 * @param vm - The memory space on which the program is loaded and executed.
	 * @param a - accumulator, set to the value written by all
	 * 			  write operations on memory and used for standard I/O.
	 * @param c - code pointer, points to the current instruction.
	 * @param d - data pointer, automatically incremented after each instruction,
	 * 			  the location it points to is used for the data manipulation commands.
	 */
	public constructor(
		public vm: ReadonlyArray<MemorySlot> = Array(MaxTenTrit).fill(new MemorySlot()),
		public a: number = 0,
		public c: number = 0,
		public d: number = 0,
	) { }

	public static crazy(trit1: Trit, trit2: Trit): Trit {
		return CrazyLookup[trit1][trit2];
	}

	public static encipher(input: number): number {
		return EncipherLookup[input % 94];
	}

	public loadProgram(program: string): void {
		const strippedProgramValues: ReadonlyArray<number> = program
			.replace(/\s/g, '')
			.split('')
			.map(char => Number(char));

		if (strippedProgramValues.length > MaxTenTrit) {
			throw new Error(`The input program is larger than Malbolge is designed to handle.`);
		}

		// Initialise all memory values to 0
		this.vm.forEach(memorySlot => memorySlot.setValue(0));

		// Fill the beginning memory with the stripped program
		for (let i = 0; i < strippedProgramValues.length; i++) {
			this.vm[i].setValue(strippedProgramValues[i]);
		}

		// Fill the remaining memory by the crazy operator.
		for (let j = strippedProgramValues.length; j < MaxTenTrit; j++) {
			this.vm[j].setValue(0);
		}
	}
}
