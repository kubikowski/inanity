import { computed, Signal } from '@angular/core';

/**
 * Returns the [ current, previous ] values of a computed signal.
 *
 * Pairwise needs to be directly tied to an effect or a renderer,
 * because otherwise it has a tendency of failing to update with the
 * same regularity that the internal computation does.
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
