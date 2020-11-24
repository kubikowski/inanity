/**
 * Returns the symmetric difference between some number of sets
 *
 * @impl Creates two sets: singles & multiples.
 * Loops over each value in each set and compares with multiples, then singles.
 * @param sets  The full array of sets for symmetric difference.
 * @return      The resulting singles array.
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
