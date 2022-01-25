import { difference } from 'src/app/core/functions/sets/difference.function';
import { equivalence } from 'src/app/core/functions/sets/equivalence.function';
import { intersection } from 'src/app/core/functions/sets/inersection.function';
import { union } from 'src/app/core/functions/sets/union.function';
import { xor } from 'src/app/core/functions/sets/xor.function';

describe('Set Utilities', () => {

	/** Value Overlaps
	 * 0    shared by setA, setB, and setC
	 * 1    shared by setA, setB
	 * 2    shared by setA, setC
	 * 3    shared by setB, setC
	 * 4    unique to setA
	 * 5    unique to setB
	 * 6    unique to setC
	 */
	const setA = new Set([ 0, 1, 2, 4 ]);
	const setB = new Set([ 0, 1, 3, 5 ]);
	const setC = new Set([ 0, 2, 3, 6 ]);
	const empty = new Set();

	describe('difference', () => {
		const differenceAB = new Set([ 2, 4 ]);
		const differenceABC = new Set([ 4 ]);

		it('no sets difference returns empty set', () => {
			const result = difference();
			expect(equivalence(result, empty)).toBeTrue();
		});

		it('single set difference returns self', () => {
			const result = difference(setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('same set has no difference overlap', () => {
			const result = difference(setA, setA);
			expect(result.size).toBe(0);
		});

		it('two sets\' difference is a subset of the first', () => {
			const result = difference(setA, setB);
			expect(equivalence(result, differenceAB)).toBeTrue();
		});

		it('three sets\' difference is a subset of the first', () => {
			const result = difference(setA, setB, setC);
			expect(equivalence(result, differenceABC)).toBeTrue();
		});
	});

	describe('equivalence', () => {
		it('no sets are equivalent', () => {
			expect(equivalence()).toBeTrue();
		});

		it('single set is equivalent', () => {
			expect(equivalence(setA)).toBeTrue();
		});

		it('same set is equivalent', () => {
			expect(equivalence(setA, setA)).toBeTrue();
		});

		it('many of the same set are equivalent', () => {
			expect(equivalence(setA, setA, setA)).toBeTrue();
		});

		it('two different sets are not equivalent', () => {
			expect(equivalence(setA, setB)).toBeFalse();
		});

		it('three different sets are not equivalent', () => {
			expect(equivalence(setA, setB, setC)).toBeFalse();
		});
	});

	describe('intersection', () => {
		const intersectionAB = new Set([ 0, 1 ]);
		const intersectionABC = new Set([ 0 ]);

		it('no sets intersection returns empty set', () => {
			const result = intersection();
			expect(equivalence(result, empty)).toBeTrue();
		});

		it('single set intersection returns self', () => {
			const result = intersection(setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('same set intersection returns self', () => {
			const result = intersection(setA, setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('two sets\' intersection is a subset of the first', () => {
			const result = intersection(setA, setB);
			expect(equivalence(result, intersectionAB)).toBeTrue();
		});

		it('three sets\' intersection is a subset of the first', () => {
			const result = intersection(setA, setB, setC);
			expect(equivalence(result, intersectionABC)).toBeTrue();
		});
	});

	describe('union', () => {
		const unionAB = new Set([ 0, 1, 2, 3, 4, 5 ]);
		const unionABC = new Set([ 0, 1, 2, 3, 4, 5, 6 ]);

		it('no sets union returns empty set', () => {
			const result = union();
			expect(equivalence(result, empty)).toBeTrue();
		});

		it('single set union returns self', () => {
			const result = union(setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('same set union returns self', () => {
			const result = union(setA, setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('two sets\' union contains all values from both sets', () => {
			const result = union(setA, setB);
			expect(equivalence(result, unionAB)).toBeTrue();
		});

		it('three sets\' union contains all values from all sets', () => {
			const result = union(setA, setB, setC);
			expect(equivalence(result, unionABC)).toBeTrue();
		});
	});

	describe('xor', () => {
		const xorAB = new Set([ 2, 3, 4, 5 ]);
		const xorABC = new Set([ 4, 5, 6 ]);

		it('no sets xor returns empty set', () => {
			const result = xor();
			expect(equivalence(result, empty)).toBeTrue();
		});

		it('single set xor returns self', () => {
			const result = xor(setA);
			expect(equivalence(result, setA)).toBeTrue();
		});

		it('equivalence: same set xor returns the empty set', () => {
			const result = xor(setA, setA);
			expect(result.size).toBe(0);
		});

		it('two different sets xor returns unique values', () => {
			const result = xor(setA, setB);
			expect(equivalence(result, xorAB)).toBeTrue();
		});

		it('three different sets xor returns unique values', () => {
			const result = xor(setA, setB, setC);
			expect(equivalence(result, xorABC)).toBeTrue();
		});
	});
});
