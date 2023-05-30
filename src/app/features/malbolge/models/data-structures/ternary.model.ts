
/** a trit is a single ternary digit: 0, 1, or 2
 * <br/> trits make up the low-level memory of malbolge
 */
export type Trit = 0 | 1 | 2;

/** TT is a tuple or a fixed length Array of 10 trits used to typeset and mock TenTrit,
 * <br/> whereas the TenTrit class is an Object prototype extending an Array prototype.
 */
type TT = [ Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit ];

/** The maximum value a TenTrit can store when evaluated as a number.
 * A tentrit acts as an unsigned int, with a range of (0, 59048);
 */
export const MaxTenTrit = 59049;

/** a TenTrit is a value stored in single memory address in the malbolge memory
 * <br/> It stores exactly ten Trits, thus it's name, and
 * is used in malbolge as the functional equivalent of a byte
 */
export class TenTrit extends Array<Trit> {
	private constructor(
		tentrit: TT = Array<Trit>(10).fill(0 as Trit) as TT,
	) {
		super(...tentrit);
	}

	private static create(): TenTrit {
		return Object.create(TenTrit.prototype);
	}

	public static default(): TenTrit {
		return this.fromValue(0);
	}

	public static fromValue(value: number): TenTrit {
		const tentrit = TenTrit.create();
		tentrit.value = value;
		return tentrit;
	}

	public static fromTenTrit(original: TenTrit | TT): TenTrit {
		const tentrit = TenTrit.create();
		tentrit.setFromTenTrit(original);
		return tentrit;
	}

	public get value(): number {
		let value = 0;
		for (let i = 0; i < 10; i++) {
			value = value + (this[i] * Math.pow(3, 9 - i));
		}
		return value;
	}

	public set value(value: number) {
		for (let i = 0; i < 10; i++) {
			this[9 - i] = value % 3 as Trit;
			value = Math.floor(value / 3);
		}
	}

	public setFromTenTrit(tentrit: TenTrit | TT): void {
		for (let i = 0; i < 10; i++) {
			this[i] = tentrit[i];
		}
	}

	public rotateRight(): void {
		const temp = this[9];
		for (let i = 9; i > 0; i--) {
			this[i] = this[i - 1];
		}
		this[0] = temp;
	}

	public equals(tentrit: TenTrit | TT): boolean {
		for (let i = 0; i < 10; i++) {
			if (this[i] !== tentrit[i]) {
				return false;
			}
		}
		return true;
	}
}
