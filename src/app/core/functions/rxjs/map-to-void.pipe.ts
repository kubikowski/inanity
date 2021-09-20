import { of, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Changes any `Observable<T>` into `Observable<void>`
 *
 * @example
 * obs$.pipe(mapToVoid());
 *
 * @return `of(void 0)` because it doesn't throw out the stream
 * @see https://stackoverflow.com/a/62642598
 */
export function mapToVoid<T>(): OperatorFunction<T, void> {
	return switchMap(() => of(void 0));
}
