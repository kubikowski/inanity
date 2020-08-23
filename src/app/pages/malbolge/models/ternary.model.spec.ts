import { TenTrit } from './ternary.model';

describe('Ternaries', () => {

	/** region Test fromValue & toValue */
	it('should return 5 -> [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ]', () => {
		expect(TenTrit.fromValue(5)).toEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ] as TenTrit);
	});

	it('should return 5 -> 5', () => {
		expect(TenTrit.toValue(TenTrit.fromValue(5))).toBe(5);
	});
});
