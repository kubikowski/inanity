export function removeNulls<T>(...sets: Set<T>[]): Set<T>[] {
	return sets.filter(set => set instanceof Set);
}
