import { xnor } from 'src/app/core/functions/boolean/xnor.function';

describe('boolean xnor', () => {
	it('should return correct values for each possible input', () => {
		expect(xnor(false, false)).toEqual(true);
		expect(xnor(false, true)).toEqual(false);
		expect(xnor(true, false)).toEqual(false);
		expect(xnor(true, true)).toEqual(true);
	});
});
