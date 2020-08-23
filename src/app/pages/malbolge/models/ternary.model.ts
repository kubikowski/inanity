
/** a Trit is a single ternary digit: 0, 1, or 2
 * <br/> Trits make up the low-level memory of malbolge
 */
export type Trit = 0 | 1 | 2;

/** a TenTrit is a value stored in single memory address in the malbolge memory
 * <br/> It is used in malbolge as the functional equivalent of a byte
 */
export type TenTrit = [Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit];

export const MaxTenTrit = 59049;

export class MemorySlot {
	private tritValue: TenTrit;
	public constructor(
		public address: number,
		public value: number,
	) { }

	static getValueFromTenTrit(tenTrit: TenTrit): number {
		let value = 0;

		for (let i = 0; i < 10; i++) {
			value = value + (tenTrit[i] * Math.pow(3, 9 - i));
		}

		return value;
	}

	static getTenTritFromValue(value: number): TenTrit {
		const tenTrit = Array(10) as TenTrit;

		let maxTrit = MaxTenTrit;
		for (let i = 0; i < 10; i++) {
			maxTrit = Math.floor(maxTrit / 3);
			if (value >= maxTrit) {
				tenTrit[i] = value % 3 as Trit;
				value = Math.floor(value / 3);
			}
		}

		return tenTrit;
	}
}
