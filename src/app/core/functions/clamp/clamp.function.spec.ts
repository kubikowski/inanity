import { clamp } from 'src/app/core/functions/clamp/clamp.function';

describe('clamp', () => {
	const lowerBound = 0;
	const upperBound = 100;

	const valueWithinBounds = 50;
	const valueMatchingLowerBounds = 0;
	const valueMatchingUpperBounds = 100;
	const valueLessThanLowerBounds = -5;
	const valueGreaterThanUpperBounds = 105;

	it('returns the value if it is between the lower and upper bounds', () => {
		expect(clamp(lowerBound, valueWithinBounds, upperBound)).toEqual(valueWithinBounds);
	});

	it('returns the value when it matches the lower or upper bounds', () => {
		expect(clamp(lowerBound, valueMatchingLowerBounds, upperBound)).toEqual(valueMatchingLowerBounds);
		expect(clamp(lowerBound, valueMatchingUpperBounds, upperBound)).toEqual(valueMatchingUpperBounds);
	});

	it('returns the lower bounds when the value is less than the lower bounds', () => {
		expect(clamp(lowerBound, valueLessThanLowerBounds, upperBound)).toEqual(lowerBound);
	});

	it('returns the upper bounds when the value is greater than the upper bounds', () => {
		expect(clamp(lowerBound, valueGreaterThanUpperBounds, upperBound)).toEqual(upperBound);
	});

	it('returns the lower bound if the upper bound is less than or equal to the upper bound', () => {
		expect(clamp(lowerBound, Math.random(), lowerBound)).toEqual(lowerBound);
		expect(clamp(lowerBound, Math.random(), lowerBound - 5)).toEqual(lowerBound);
	});
});
