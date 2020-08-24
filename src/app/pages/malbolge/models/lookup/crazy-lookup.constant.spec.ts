import { TenTrit } from '../data-structures/ternary.model';
import { tenCrazy } from './crazy-lookup.constant';

describe('Crazy Lookup', () => {

	it('should return (crz 0000000000 0000000000) -> 1111111111', () => {
		const tenTrit1 = TenTrit.fromTenTrit([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
		const tenTrit2 = TenTrit.fromTenTrit([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
		expect(tenCrazy(tenTrit1, tenTrit2)).toEqual(TenTrit.fromTenTrit([ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]));
	});

	it('should return (crz 0001112220 0120120120) -> 1001022211', () => {
		const tenTrit1 = TenTrit.fromTenTrit([ 0, 0, 0, 1, 1, 1, 2, 2, 2, 0 ]);
		const tenTrit2 = TenTrit.fromTenTrit([ 0, 1, 2, 0, 1, 2, 0, 1, 2, 0 ]);
		expect(tenCrazy(tenTrit1, tenTrit2)).toEqual(TenTrit.fromTenTrit([ 1, 0, 0, 1, 0, 2, 2, 2, 1, 1 ]));
	});
});
