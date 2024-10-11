import { from, of } from 'rxjs';
import { count, tap } from 'rxjs/operators';
import { mapToVoid } from 'src/app/core/functions/rxjs/map-to-void.function';

describe('mapToVoid', () => {

	const num$ = of(1)
		.pipe(mapToVoid());

	const stuff = [
		'johnny',
		77,
		true,
		null,
		undefined,
		new Date(),
		function simpleFunction() {
			return 'stuff'; 
		},
		Symbol('symbol'),
		/abc/,
		new Error('error'),
		{ name: 'johnny' },
		[ 1, 2, 3 ],
		new Set([ 'a', 'b', 'c' ]),
		new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]),
	];

	const stuff$ = from(stuff)
		.pipe(mapToVoid());

	it('should map to void', () => {
		num$.subscribe(num => expect(num).toBe(undefined));
	});

	it('should map all to void', () => {
		stuff$.pipe(
			tap(thing => expect(thing).toBe(undefined)),
			count(),
		).subscribe(_count => expect(_count).toBe(stuff.length));
	});
});
