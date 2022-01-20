import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters out `null` values from streams
 *
 * @example
 * obs$.pipe(notNullFilter());
 */
export function notNullFilter<T>(): OperatorFunction<T, Exclude<T, null>> {
	return filter<T>(value => value !== null) as OperatorFunction<T, Exclude<T, null>>;
}
