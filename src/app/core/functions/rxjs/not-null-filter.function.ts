import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out `null` values from streams
 *
 * @example
 * obs$.pipe(notNullFilter());
 */
export function notNullFilter<T>(): MonoTypeOperatorFunction<T> {
	return filter<T>(value => value !== null);
}
