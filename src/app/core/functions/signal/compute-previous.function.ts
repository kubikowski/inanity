import { computed, Signal, untracked } from '@angular/core';

export function computePrevious<T>(current: Signal<T>, length: number): Signal<T[]> {
	let previous = [ untracked(current) ];

	return computed(() => {
		previous = [ ...previous.slice((previous.length <= length) ? 0 : 1), current() ];
		return previous;
	});
}
