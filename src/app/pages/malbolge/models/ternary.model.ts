
/** a Trit is a single ternary digit: 0, 1, or 2
 * <br/> Trits make up the low-level memory of malbolge
 */
export type Trit = 0 | 1 | 2;

/** a TenTrit is a value stored in single memory address in the malbolge memory
 * <br/> It is used in malbolge as the functional equivalent of a byte
 */
export type TenTrit = [Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit, Trit];

/** The maximum value a TenTrit can store when evaluated as a number. */
export const MaxTenTrit = 59049;
