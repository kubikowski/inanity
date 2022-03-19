export function removeNulls<T, S extends ReadonlySet<T>>(...sets: S[]): S[] {
	return sets.filter(set => set instanceof Set);
}
