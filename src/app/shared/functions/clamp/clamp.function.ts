/**
 * Clamps a number between some upper and lower bounds
 *
 * @param lowerBound - the lowest number that can be returned
 * @param value - the value to clamp
 * @param upperBound - the highest number that can be returned
 * @return a number between two numbers
 */
export function clamp(lowerBound: number, value: number, upperBound: number): number {
	return Math.max(lowerBound, Math.min(upperBound, value));
}
