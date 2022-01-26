import { mod } from 'src/app/core/functions/number/mod.function';

describe('mod', () => {

	const abovePositiveDivisor =    13;
	const positiveDivisor =         9;
	const belowPositiveDivisor =    5;
	const positiveRemainder =       4;
	const positiveZero =            0;

	const belowNegativeDivisor =    -13;
	const negativeDivisor =         -9;
	const aboveNegativeDivisor =    -5;
	const negativeRemainder =       -4;
	const negativeZero =            -0;

	describe('Positive Divisors', () => {
		it('returns +dividend for (+dividend < +divisor)', () => {
			expect(mod(belowPositiveDivisor, positiveDivisor)).toEqual(belowPositiveDivisor);
		});

		it('returns +remainder for (+dividend > +divisor)', () => {
			expect(mod(abovePositiveDivisor, positiveDivisor)).toEqual(positiveRemainder);
		});

		it('returns +zero for (+dividend = +divisor)', () => {
			expect(mod(positiveDivisor, positiveDivisor)).toEqual(positiveZero);
		});

		it('returns +dividend for (abs(-dividend) > +divisor)', () => {
			expect(mod(belowNegativeDivisor, positiveDivisor)).toEqual(belowPositiveDivisor);
		});

		it('returns +remainder for (abs(-dividend) < +divisor)', () => {
			expect(mod(aboveNegativeDivisor, positiveDivisor)).toEqual(positiveRemainder);
		});
	});

	describe('Negative Divisors', () => {
		it('returns -dividend for (abs(-dividend) < abs(-divisor))', () => {
			expect(mod(aboveNegativeDivisor, negativeDivisor)).toEqual(aboveNegativeDivisor);
		});

		it('returns -remainder for (abs(-dividend) > abs(-divisor))', () => {
			expect(mod(belowNegativeDivisor, negativeDivisor)).toEqual(negativeRemainder);
		});

		it('returns -zero for (abs(-dividend) = abs(-divisor))', () => {
			expect(mod(negativeDivisor, negativeDivisor)).toEqual(negativeZero);
		});

		it('returns -dividend for (+dividend > abs(-divisor))', () => {
			expect(mod(abovePositiveDivisor, negativeDivisor)).toEqual(aboveNegativeDivisor);
		});

		it('returns -remainder for (+dividend < abs(-divisor))', () => {
			expect(mod(belowPositiveDivisor, negativeDivisor)).toEqual(negativeRemainder);
		});
	});

	describe('Zeroes', () => {
		it('returns +zero for (dividend = +zero) with +divisor', () => {
			expect(mod(positiveZero, positiveDivisor)).toEqual(positiveZero);
		});

		it('returns -zero for (dividend = +zero) with -divisor', () => {
			expect(mod(positiveZero, negativeDivisor)).toEqual(negativeZero);
		});

		it('returns NaN for (divisor = +zero)', () => {
			expect(mod(Math.random(), positiveZero)).toEqual(NaN);
		});

		it('returns NaN for (divisor = -zero)', () => {
			expect(mod(Math.random(), negativeZero)).toEqual(NaN);
		});
	});
});
