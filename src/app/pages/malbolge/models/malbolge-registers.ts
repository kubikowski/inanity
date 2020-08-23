
export class MalbolgeRegisters {
	/** Stores each of the registers used to execute a malbolge program.
	 * @param a - accumulator, set to the value written by all
	 * 			  write operations on memory and used for standard I/O.
	 * @param c - code pointer, points to the current instruction.
	 * @param d - data pointer, automatically incremented after each instruction,
	 * 			  the location it points to is used for the data manipulation commands.
	 */
	public constructor(
		public a: number = 0,
		public c: number = 0,
		public d: number = 0,
	) { }
}
