import { computed, Signal } from '@angular/core';

/**
 * Returns the [ current, previous ] values of a computed signal.
 */
export function pairwise<T>(computation: () => T): Signal<[ T, T? ]> {
	let state: [ T, T? ];

	return computed(() => {
		const current = computation();
		const previous = state?.[0];
		state = [ current, previous ];
		return state;
	});
}
