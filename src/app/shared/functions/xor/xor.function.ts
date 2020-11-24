/**
 * @param sets      an arbitrary number of sets.
 * @return          an array of values that exist in only in one of the input arrays.
 */
export function xorSets<T>(...sets: Set<T>[]): Set<T> {
	switch (sets.length) {
		case 0:
			return new Set();
		case 1:
			return sets[0];
		default:
			return xor(...sets);
	}
}

/**
 * Creates two sets: singles & multiples.
 * Loops over each value in each set and compares with multiples, then singles.
 *
 * @param sets The full array of sets for symmetric difference
 * @return the resulting singles array
 *
 * @runtime O(n*m)
 */
function xor<T>(...sets: Set<T>[]): Set<T> {
	const multiples: Set<T> = new Set();
	const singles: Set<T> = new Set();

	sets.forEach(set => {
		set.forEach(value => {
			if (!multiples.has(value)) {
				return;
			} else if (singles.has(value)) {
				singles.delete(value);
				multiples.add(value);
			} else {
				singles.add(value);
			}
		});
	});

	return singles;
}
