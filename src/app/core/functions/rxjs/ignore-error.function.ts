import { MonoTypeOperatorFunction, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Determines what to replace errored streams with.
 *
 * * NONE • discards the stream.
 * * NULL • outputs a `null` stream in place of errors.
 * * VOID • outputs a `void 0` stream in place of errors.
 */
export enum ErrorEmission {
	NONE = 'NONE',
	NULL = 'NULL',
	VOID = 'VOID',
}

/**
 * Discards errored streams, or replaces them with `null` or `void` outputs.
 *
 * @example
 * obs$.pipe(ignoreError());
 * obs$.pipe(ignoreError(ErrorEmission.NULL));
 *
 * @param errorEmission Determines what to replace errored streams with.
 *
 * @return `of()`, `of(null)`, or `of(void 0)`, depending on errorEmission.
 */
export function ignoreError<T>(errorEmission = ErrorEmission.NONE): MonoTypeOperatorFunction<T> {
	switch (errorEmission) {
		default:
		case ErrorEmission.NONE:
			return catchError(ignored => of<T>());
		case ErrorEmission.NULL:
			return catchError(ignored => of<T>(null));
		case ErrorEmission.VOID:
			return catchError(ignored => of<T>(void 0));
	}
}
