/**
 * Signed Modulus - returns a remainder between ±0 and the ±divisor,
 * accounting for the sign of each input.
 *
 * @param dividend  the dividend.
 * @param divisor   the divisor (or quotient).
 * @return          the remainder.
 */
export function mod(dividend: number, divisor: number): number {
	return ((dividend % divisor) + divisor) % divisor;
}
