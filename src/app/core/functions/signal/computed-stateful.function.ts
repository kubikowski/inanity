import { computed, Signal } from '@angular/core';

export function computedStateful<T>(initial: T, computation: (state: T) => T): Signal<T> {
	let state = initial;

	return computed(() => {
		state = computation(state);
		return state;
	});
}
