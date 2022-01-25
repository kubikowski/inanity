/**
 * The union of two sets contains all the elements contained in either set (or both sets).
 * Set union is notated A ∪ B.
 * @description A ∪ B := { x : x ∈ A ∨ x ∈ B }
 */
export function union<T>(...sets: Set<T>[]): Set<T> {
	const result = new Set<T>([ ...sets[0] ?? new Set<T>() ]);

	for (let i = 1; i < sets.length; i++) {
		sets[i]?.forEach(t => {
			result.add(t);
		});
	}

	return result;
}
