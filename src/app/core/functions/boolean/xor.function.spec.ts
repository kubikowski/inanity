import { xor } from 'src/app/core/functions/boolean/xor.function';

describe('boolean xor', () => {
	it('should return correct values for each possible input', () => {
		expect(xor(false, false)).toEqual(false);
		expect(xor(false, true)).toEqual(true);
		expect(xor(true, false)).toEqual(true);
		expect(xor(true, true)).toEqual(false);
	});

	xit('should be using the most efficient method', () => {
		const testCases: [ number, number ][] = [];
		const testCasesB: [ boolean, boolean ][] = [];

		for (let i = 0; i < 1000000; i++) {
			const a = Math.round(Math.random());
			const b = Math.round(Math.random());
			testCases.push([ a, b ]);
			testCasesB.push([ Boolean(a), Boolean(b) ]);
		}

		console.time('bitwise plus boolean constructor x3');
		for (let i = 0; i < testCases.length; i++) {
			const [ a, b ] = testCases[i]!;
			const _value = xor(Boolean(a), Boolean(b));
		}
		console.timeEnd('bitwise plus boolean constructor x3');

		console.time('bitwise plus boolean constructor');
		for (let i = 0; i < testCasesB.length; i++) {
			const [ a, b ] = testCasesB[i]!;
			const _value = xor(a, b);
		}
		console.timeEnd('bitwise plus boolean constructor');

		console.time('bitwise without boolean constructor');
		for (let i = 0; i < testCases.length; i++) {
			const [ a, b ] = testCases[i]!;
			const _value = (a ^ b) !== 0;
		}
		console.timeEnd('bitwise without boolean constructor');

		console.time('alt');
		for (let i = 0; i < testCases.length; i++) {
			const [ a, b ] = testCases[i]!;
			const _value = a !== b;
		}
		console.timeEnd('alt');
	});
});
