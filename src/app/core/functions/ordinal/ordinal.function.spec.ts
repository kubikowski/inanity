import { ordinal } from 'src/app/core/functions/ordinal/ordinal.function';

describe('ordinal', () => {
	// standards
	const zeroes =  [ -1000, -20, -10, -0, 0, 10, 20, 1000 ] as const;
	const ones =    [ -1001, -21,      -1, 1,     21, 1001 ] as const;
	const twos =    [ -2222, -22,      -2, 2,     22, 2222 ] as const;
	const threes =  [ -3333, -23,      -3, 3,     23, 3333 ] as const;
	const fours =   [ -4444, -24, -14, -4, 4, 14, 24, 4444 ] as const;
	const fives =   [ -5555, -25, -15, -5, 5, 15, 25, 5555 ] as const;
	const sixes =   [ -6666, -26, -16, -6, 6, 16, 26, 6666 ] as const;
	const sevens =  [ -7777, -27, -17, -7, 7, 17, 27, 7777 ] as const;
	const eights =  [ -8888, -28, -18, -8, 8, 18, 28, 8888 ] as const;
	const nines =   [ -9999, -29, -19, -9, 9, 19, 29, 9999 ] as const;

	// outliers: should be 'th'
	const elevens =     [ -1111, -11, 11, 1111 ] as const;
	const twelves =     [ -1212, -12, 12, 1212 ] as const;
	const thirteens =   [ -1313, -13, 13, 1313 ] as const;

	describe('standards', () => {
		it('should convert …0 → \'th\'', () => {
			zeroes.forEach(zero =>
				expect(ordinal(zero)).toBe('th'));
		});

		// excluding elevens
		it('should convert …1 → \'st\'', () => {
			ones.forEach(one =>
				expect(ordinal(one)).toBe('st'));
		});

		// excluding twelves
		it('should convert …2 → \'nd\'', () => {
			twos.forEach(two =>
				expect(ordinal(two)).toBe('nd'));
		});

		// excluding thirteens
		it('should convert …3 → \'rd\'', () => {
			threes.forEach(three =>
				expect(ordinal(three)).toBe('rd'));
		});

		it('should convert …4 → \'th\'', () => {
			fours.forEach(four =>
				expect(ordinal(four)).toBe('th'));
		});

		it('should convert …5 → \'th\'', () => {
			fives.forEach(five =>
				expect(ordinal(five)).toBe('th'));
		});

		it('should convert …6 → \'th\'', () => {
			sixes.forEach(six =>
				expect(ordinal(six)).toBe('th'));
		});

		it('should convert …7 → \'th\'', () => {
			sevens.forEach(seven =>
				expect(ordinal(seven)).toBe('th'));
		});

		it('should convert …8 → \'th\'', () => {
			eights.forEach(eight =>
				expect(ordinal(eight)).toBe('th'));
		});

		it('should convert …9 → \'th\'', () => {
			nines.forEach(nine =>
				expect(ordinal(nine)).toBe('th'));
		});
	});

	describe('outliers', () => {
		it('should convert …11 → \'th\'', () => {
			elevens.forEach(eleven =>
				expect(ordinal(eleven)).toBe('th'));
		});

		it('should convert …12 → \'th\'', () => {
			twelves.forEach(twelve =>
				expect(ordinal(twelve)).toBe('th'));
		});

		it('should convert …13 → \'th\'', () => {
			thirteens.forEach(thirteen =>
				expect(ordinal(thirteen)).toBe('th'));
		});
	});
});
