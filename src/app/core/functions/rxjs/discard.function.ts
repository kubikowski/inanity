import { of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Discards all values in the stream.
 *
 * @example
 * obs$.pipe(discard());
 *
 * @return `of()` because it does not emit values
 */
export function discard<T>(): OperatorFunction<T, never> {
	return switchMap(() => of<never>());
}
