/**
 * Resolves a promise on a timeout
 */
export function timeout(ms?: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
