import { Injectable } from '@angular/core';
import { MaxTenTrit, TenTrit } from '../models/data-structures/ternary.model';
import { ReadonlyArrayProxy } from '../models/data-structures/negative-index-array.proxy';
import { getCrazyLoop } from '../models/lookup/crazy-lookup.constant';

@Injectable({ providedIn: 'any' })
export class MalbolgeExecutorService {

	/** Stores the memory and each of the registers used to execute a malbolge program.
	 * @param vm - The memory space on which the program is loaded and executed.
	 * @param a - accumulator, set to the value written by all
	 * 			  write operations on memory and used for standard I/O.
	 * @param c - code pointer, points to the current instruction.
	 * @param d - data pointer, automatically incremented after each instruction,
	 * 			  the location it points to is used for the data manipulation commands.
	 */
	public vm: ReadonlyArray<TenTrit> = ReadonlyArrayProxy(Array.from({ length: MaxTenTrit }, () => TenTrit.create()));
	public a = 0;
	public c = 0;
	public d = 0;

	public constructor() { }

	public loadProgram(program: string): void {
		const strippedProgramValues: ReadonlyArray<number> = program
			.replace(/\s/g, '')
			.split('')
			.map(char => char.charCodeAt(0));

		if (strippedProgramValues.length > MaxTenTrit) {
			throw new Error(`The input program is larger than Malbolge is designed to handle.`);
		}

		// Initialise all memory values to 0
		this.vm.forEach(memorySlot => memorySlot.value = 0);

		// Fill the beginning memory with the stripped program
		for (let i = 0; i < strippedProgramValues.length; i++) {
			this.vm[i].value = strippedProgramValues[i];
		}

		// Fill the remaining memory by the crazy operator.
		const crazyLoop = getCrazyLoop(this.vm[strippedProgramValues.length - 2], this.vm[strippedProgramValues.length - 1]);
		let crazyLoopIndex = 0;

		for (let j = strippedProgramValues.length; j < MaxTenTrit; j++) {
			if (crazyLoopIndex >= crazyLoop.length)
				crazyLoopIndex = 0;

			this.vm[j].setFromTenTrit(crazyLoop[crazyLoopIndex]);
			crazyLoopIndex++;
		}
	}

	public step(): void {
		const instruction = (this.c + this.vm[this.c].value) % 94;
		switch (instruction) {
			case 4:		/* (jmp [d]) */
			case 5:		/* (out a) */
			case 23:	/* (in a) */
			case 39:	/* (rotr [d]), (mov a, [d]) */
			case 40:	/* (mov d, [d]) */
			case 62:	/* (crz [d], a), (mov a, [d]) */
			case 81:	/* (end) */
			case 68:	/* (nop) */
			default:	/* (nop) */
		}
	}
}
