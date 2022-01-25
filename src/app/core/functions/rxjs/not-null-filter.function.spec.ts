import { from, of } from 'rxjs';
import { count, tap } from 'rxjs/operators';
import { notNullFilter } from 'src/app/core/functions/rxjs/not-null-filter.function';

describe('notNullFilter', () => {

	const never$ = of(null)
		.pipe(notNullFilter());

	const num$ = of(1)
		.pipe(notNullFilter());

	const stuff = [
		1,
		null,
		undefined,
	];
	const nonNullStuff = stuff
		.filter(thing => thing !== null);

	const stuff$ = from(stuff)
		.pipe(notNullFilter());

	let num: number | null | void;
	beforeEach(() => num = 0);

	it('should not emit null value', () => {
		never$.subscribe(_num => num = _num);

		expect(num).toBe(0);
	});

	it('should emit non-null value', () => {
		num$.subscribe(_num => num = _num);

		expect(num).toBe(1);
	});

	it('should only filter null emissions', () => {
		stuff$.pipe(
			tap(thing => expect(thing).not.toBe(null as unknown as number)),
			count(),
		).subscribe(_count => expect(_count).toBe(nonNullStuff.length));
	});
});
