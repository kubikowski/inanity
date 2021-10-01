import { MonoTypeOperatorFunction, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Discards the stream in case of error
 *
 * @example
 * obs$.pipe(discardError());
 *
 * @return `of()` because it discards the stream
 */
export function discardError<T>(): MonoTypeOperatorFunction<T> {
	return catchError(ignored => of<T>());
}
