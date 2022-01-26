const ordinals = [ 'th', 'st', 'nd', 'rd' ] as const;

/**
 * returns a number's ordinal
 *
 * @example
 * 1 ⇒ 'st'
 * @example
 * 23 ⇒ 'rd'
 */
export function ordinal(num: number): string {
	const remainder = Math.abs(num) % 100;

	return ordinals[(remainder - 20) % 10]
		|| ordinals[remainder]
		|| ordinals[0];
}
