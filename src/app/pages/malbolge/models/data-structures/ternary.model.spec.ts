import { TenTrit, MaxTenTrit } from './ternary.model';

describe('Ternaries', () => {

	describe('Construction & toValue', () => {
		it('should create instance of TenTrit', () => {
			expect(TenTrit.create()).toBeInstanceOf(TenTrit);
		});

		it('should return [0000000000] -> 0', () => {
			expect(TenTrit.fromTenTrit([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]).value).toBe(0);
		});

		it('should return [2222222222] -> MaxTenTrit - 1', () => {
			expect(TenTrit.fromTenTrit([ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]).value).toBe(MaxTenTrit - 1);
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
	});

	describe('Object Methods', () => {
		it('should rotate right [0002111112] -> [2000211111]', () => {
			const tentrit = TenTrit.fromTenTrit([ 0, 0, 0, 2, 1, 1, 1, 1, 1, 2 ]);
			tentrit.rotateRight();
			expect(tentrit).toEqual(TenTrit.fromTenTrit([ 2, 0, 0, 0, 2, 1, 1, 1, 1, 1 ]));
		});

		it('should return [0001112220].equals([0001112220]) -> true', () => {
			const tenTrit1 = TenTrit.fromTenTrit([ 0, 0, 0, 1, 1, 1, 2, 2, 2, 0 ]);
			const tenTrit2 = TenTrit.fromTenTrit([ 0, 0, 0, 1, 1, 1, 2, 2, 2, 0 ]);
			expect(tenTrit1.equals(tenTrit2)).toBe(true);
		});

		it('should return [0001112220].equals([0120120120]) -> false', () => {
			const tenTrit1 = TenTrit.fromTenTrit([ 0, 0, 0, 1, 1, 1, 2, 2, 2, 0 ]);
			const tenTrit2 = TenTrit.fromTenTrit([ 0, 1, 2, 0, 1, 2, 0, 1, 2, 0 ]);
			expect(tenTrit1.equals(tenTrit2)).toBe(false);
		});
	});
});
