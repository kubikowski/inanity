/**
 * The intersection of two sets contains all the elements each contained in both of the sets.
 * Set intersection is notated A ∩ B.
 * @description A ∩ B := { x : x ∈ A ∧ x ∈ B }
 */
export function intersection<T>(...sets: Set<T>[]): Set<T> {
	let result = new Set<T>([ ...sets[0] ]);

	for (let i = 1; i < sets.length; i++) {
		const _intersection = new Set<T>();

		sets[i].forEach(t => {
			if (result.has(t)) {
				_intersection.add(t);
			}
		});

		result = _intersection;
	}

	return result;
}
