import { CompletionObserver, from, NextObserver, of } from 'rxjs';
import { discard } from 'src/app/core/functions/rxjs/discard.function';

describe('discard', () => {

	const num$ = of(1)
		.pipe(discard());

	const stuff = [
		'johnny',
		77,
		true,
		null,
		undefined,
		new Date(),
		function simpleFunction() { return 'stuff'; },
		Symbol('symbol'),
		/abc/,
		new Error('error'),
		{ name: 'johnny' },
		[ 1, 2, 3 ],
		new Set([ 'a', 'b', 'c' ]),
		new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]),
	];

	const stuff$ = from(stuff)
		.pipe(discard());


	let num: number;
	let spyNext: jasmine.Spy;
	let spyComplete: jasmine.Spy;

	const observer: NextObserver<unknown> & CompletionObserver<unknown> = {
		next: () => num++,
		complete: () => expect(num).toBe(0),
	};

	beforeEach(() => {
		num = 0;
		spyNext = spyOn(observer, 'next');
		spyComplete = spyOn(observer, 'complete');
	});

	it('should discard stream', () => {
		num$.subscribe(observer);

		expect(spyNext).not.toHaveBeenCalled();
		expect(spyComplete).toHaveBeenCalledTimes(1);
	});

	it('should discard all values in stream', () => {
		stuff$.subscribe(observer);

		expect(spyNext).not.toHaveBeenCalled();
		expect(spyComplete).toHaveBeenCalledTimes(1);
	});
});
