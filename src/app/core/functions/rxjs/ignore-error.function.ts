import { MonoTypeOperatorFunction, of, OperatorFunction } from 'rxjs';
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

type ErrorEmissionType = {
	[ErrorEmission.NONE]: never;
	[ErrorEmission.NULL]: null;
	[ErrorEmission.VOID]: void;
};
type ErrorEmissionReturnType<EE extends ErrorEmission | undefined> = EE extends ErrorEmission
	? ErrorEmissionType[EE]
	: never;

/**
 * Discards errored streams.
 *
 * @example
 * obs$.pipe(ignoreError());
 *
 * @return `of()`
 */
export function ignoreError<T>(): MonoTypeOperatorFunction<T>;

/**
 * Discards errored streams, or replaces them with `null` or `void` outputs.
 *
 * @example
 * obs$.pipe(ignoreError(ErrorEmission.NULL));
 *
 * @param errorEmission Determines what to replace errored streams with.
 *
 * @return `of()`, `of(null)`, or `of(void 0)`, depending on errorEmission.
 */
export function ignoreError<T, EE extends ErrorEmission>(errorEmission: EE): OperatorFunction<T, T | ErrorEmissionReturnType<EE>>;

export function ignoreError<T, EE extends ErrorEmission>(errorEmission?: EE): OperatorFunction<T, T | ErrorEmissionReturnType<EE>> {
	switch (errorEmission) {
		default:
		case ErrorEmission.NONE:
			return catchError(_ignored => of<T>());
		case ErrorEmission.NULL:
			return catchError(_ignored => of<T | null>(null)) as OperatorFunction<T, T | ErrorEmissionReturnType<EE>>;
		case ErrorEmission.VOID:
			return catchError(_ignored => of<T | void>(void 0)) as OperatorFunction<T, T | ErrorEmissionReturnType<EE>>;
	}
}
