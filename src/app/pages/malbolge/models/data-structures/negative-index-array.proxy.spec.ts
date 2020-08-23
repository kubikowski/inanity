import { negativeIndexArrayProxy, negativeIndexReadonlyArrayProxy } from './negative-index-array.proxy';

describe('Negative Index Arrays', () => {

	describe('Negative Index Array', () => {
		it('should get [0] at [0]', () => {
			const array: Array<string> = Array('a', 'b', 'c');
			const arrayProxy: Array<string> = negativeIndexArrayProxy(array);
			expect(arrayProxy[0]).toBe('a');
		});

		it('should get [-1] at [2]', () => {
			const array: Array<string> = Array('a', 'b', 'c');
			const arrayProxy: Array<string> = negativeIndexArrayProxy(array);
			expect(arrayProxy[-1]).toBe('c');
		});

		it('should set [-1] at [2]', () => {
			const array: Array<string> = Array('a', 'b', 'c');
			const arrayProxy: Array<string> = negativeIndexArrayProxy(array);
			expect(arrayProxy[-1] = 'd').toBeTruthy();
		});

		it('should handle Array.prototype.forEach', () => {
			const array: Array<string> = Array('a', 'b', 'c');
			const arrayProxy: Array<string> = negativeIndexArrayProxy(array);
			expect(arrayProxy.forEach(item => {})).toBeUndefined();
		});

		it('should handle Array.prototype.map', () => {
			const array: Array<string> = Array('a', 'b', 'c');
			const arrayProxy: Array<string> = negativeIndexArrayProxy(array);
			expect(arrayProxy.map(item => item)).toEqual(Array('a', 'b', 'c'));
		});
	});

	describe('Negative Index Readonly Array', () => {
		it('should get [0] as [0]', () => {
			const array: ReadonlyArray<string> = Array('a', 'b', 'c');
			const arrayProxy: ReadonlyArray<string> = negativeIndexReadonlyArrayProxy(array);
			expect(arrayProxy[0]).toBe('a');
		});

		it('should get [-1] as [2]', () => {
			const array: ReadonlyArray<string> = Array('a', 'b', 'c');
			const arrayProxy: ReadonlyArray<string> = negativeIndexReadonlyArrayProxy(array);
			expect(arrayProxy[-1]).toBe('c');
		});

		it('should handle Array.prototype.forEach', () => {
			const array: ReadonlyArray<string> = Array('a', 'b', 'c');
			const arrayProxy: ReadonlyArray<string> = negativeIndexReadonlyArrayProxy(array);
			expect(arrayProxy.forEach(item => {})).toBeUndefined();
		});

		it('should handle Array.prototype.map', () => {
			const array: ReadonlyArray<string> = Array('a', 'b', 'c');
			const arrayProxy: ReadonlyArray<string> = negativeIndexReadonlyArrayProxy(array);
			expect(arrayProxy.map(item => item)).toEqual(Array('a', 'b', 'c'));
		});
	});
});
