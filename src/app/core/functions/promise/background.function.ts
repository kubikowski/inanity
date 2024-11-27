export async function background<T>(promises: Iterable<T | PromiseLike<T>>): Promise<void> {
	await Promise.race([
		...promises,
		new Promise(resolve => resolve(null)),
	]);
}
