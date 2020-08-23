import { TenTrit, MaxTenTrit } from './ternary.model';

describe('Ternaries', () => {

	/** region Test fromValue & toValue */
	it('should create instance of TenTrit', () => {
		expect(TenTrit.fromValue(0)).toBeInstanceOf(TenTrit);
	});

	it('should return 5 -> 5', () => {
		expect(TenTrit.fromValue(5).value).toBe(5);
	});

	it('should return MaxTenTrit - 1 -> MaxTenTrit - 1', () => {
		expect(TenTrit.fromValue(MaxTenTrit - 1).value).toBe(MaxTenTrit - 1);
	});

	it('should return MaxTenTrit -> 0', () => {
		expect(TenTrit.fromValue(MaxTenTrit).value).toBe(0);
	});

	it('should return MaxTenTrit + 50 -> 50', () => {
		expect(TenTrit.fromValue(MaxTenTrit + 50).value).toBe(50);
	});
	/** endregion */
});
