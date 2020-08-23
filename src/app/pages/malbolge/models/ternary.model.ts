
/** a Trit is a single ternary digit: 0, 1, or 2
 * <br/> Trits make up the low-level memory of malbolge
 */
export type Trit = 0 | 1 | 2;

/** the TT type is used to typeset the TenTrit constructor. */
type TT = [Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit];

/** The maximum value a TenTrit can store when evaluated as a number.
 * A tentrit acts as an unsigned int, with a range of (0, 59048);
 */
export const MaxTenTrit = 59049;

/** a TenTrit is a value stored in single memory address in the malbolge memory
 * <br/> It stores exactly ten Trits, thus it's name, and
 * is used in malbolge as the functional equivalent of a byte
 */
export class TenTrit extends Array<Trit> {
	private constructor(tentrit: TT = Array<Trit>(10).fill(0 as Trit) as TT) {
		super(...tentrit);
		Object.setPrototypeOf(this, Object.create(TenTrit.prototype));
	}

	public static fromValue(value: number): TenTrit {
		const tenTrit = new TenTrit();
		for (let i = 0; i < 10; i++) {
			tenTrit[9 - i] = value % 3 as Trit;
			value = Math.floor(value / 3);
		}
		return tenTrit;
	}

	public static toValue(tenTrit: TenTrit): number {
		let value = 0;
		for (let i = 0; i < 10; i++) {
			value = value + (tenTrit[i] * Math.pow(3, 9 - i));
		}
		return value;
	}
}
