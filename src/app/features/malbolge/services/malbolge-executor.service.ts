import { Injectable } from '@angular/core';
import { ReadonlyCircularArray } from 'src/app/core/data-structures/circular-array/circular-array.proxy';
import { MaxTenTrit, TenTrit } from 'src/app/features/malbolge/models/data-structures/ternary.model';
import { getCrazyLoop } from 'src/app/features/malbolge/models/lookup/crazy-lookup.constant';

/** Stores the memory and each of the registers used to execute a malbolge program.
 * @param vm - The memory space on which the program is loaded and executed.
 * @param a - accumulator, set to the value written by all
 * 			  write operations on memory and used for standard I/O.
 * @param c - code pointer, points to the current instruction.
 * @param d - data pointer, automatically incremented after each instruction,
 * 			  the location it points to is used for the data manipulation commands.
 */
@Injectable()
export class MalbolgeExecutorService {

	public vm: ReadonlyArray<TenTrit> = ReadonlyCircularArray(Array.from({ length: MaxTenTrit }, () => TenTrit.default()));
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
