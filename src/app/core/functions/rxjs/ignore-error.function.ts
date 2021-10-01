import { MonoTypeOperatorFunction, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Replaces errored streams with `null` values
 *
 * @example
 * obs$.pipe(ignoreError());
 *
 * @return `of(null)`
 */
export function ignoreError<T>(): MonoTypeOperatorFunction<T> {
	return catchError(ignored => of<T>(null));
}
