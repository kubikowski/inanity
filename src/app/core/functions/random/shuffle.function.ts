import { Random } from './random.function';

const random = Random.unseeded();

/**
 * Implementation of the Fisher–Yates shuffle algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export function shuffle<T>(array: Array<T>): Array<T> {
	let lastIndex = array.length;
	let randomIndex: number;
	let element: T;

	// While there remain elements to shuffle…
	while (lastIndex > 0) {

		// Pick a remaining element…
		randomIndex = random.uniform(lastIndex--);

		// And swap it with the current element.
		element = array[lastIndex]!;
		array[lastIndex] = array[randomIndex]!;
		array[randomIndex] = element;
	}

	return array;
}
