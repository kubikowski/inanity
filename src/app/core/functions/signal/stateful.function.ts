import { computed, Signal, untracked } from '@angular/core';

export function stateful<T>(initial: T, computation: (state: T) => T): Signal<T> {
	let state = initial;

	return computed(() => {
		state = computation(state);
		return state;
	});
}

export function stateOf<T>(initial: Signal<T>, computation: (state: T) => T): Signal<T> {
	let initialization = untracked(initial);
	let state = initialization;

	return computed(() => {
		const currentInitialization = initial();
		const currentComputation = computation(state);

		if (currentInitialization !== initialization) {
			initialization = currentInitialization;
			state = initialization;
		} else {
			state = currentComputation;
		}

		return state;
	});
}
