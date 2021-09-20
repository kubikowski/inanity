/**
 * Escapes any RegExp special characters in a string,
 * so that it can be used safely in a RegExp.
 *
 * This implementation has been unceremoniously stolen from the MDN docs.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
 */
export function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
}
