import { of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ErrorEmission, ignoreError } from 'src/app/core/functions/rxjs/ignore-error.function';

describe('ignoreError', () => {

	const num$ = of(1)
		.pipe(switchMap(() => throwError('invalid number')));

	let num: number | null | void;
	beforeEach(() => num = 0);

	it('no input should discard error', () => {
		num$.pipe(ignoreError())
			.subscribe(_num => num = _num);

		expect(num).toBe(0);
	});

	it('ErrorEmission.NONE should discard error', () => {
		num$.pipe(ignoreError(ErrorEmission.NONE))
			.subscribe(_num => num = _num);

		expect(num).toBe(0);
	});

	it('ErrorEmission.NULL should convert error → null', () => {
		num$.pipe(ignoreError(ErrorEmission.NULL))
			.subscribe(_num => num = _num);

		expect(num).toBe(null);
	});

	it('ErrorEmission.VOID should convert error → void', () => {
		num$.pipe(ignoreError(ErrorEmission.VOID))
			.subscribe(_num => num = _num);

		expect(num).toBe(undefined);
	});
});
