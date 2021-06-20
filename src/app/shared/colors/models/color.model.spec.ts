import { Color, InvalidColorString } from 'src/app/shared/colors/models/color.model';

describe('Color', () => {

	describe('RGB Types', () => {
		it('should return "rgb(127, 128, 129)" -> "rgb(127, 128, 129)"', () => {
			const toString = Color.fromString('rgb(127, 128, 129)').toString();
			expect(toString).toBe('rgb(127, 128, 129)');
		});

		it('should return "rgba(253,254, 255 ,  1  )" -> "rgb(253, 254, 255)"', () => {
			const toString = Color.fromString('rgba(253,254, 255 ,  1  )').toString();
			expect(toString).toBe('rgb(253, 254, 255)');
		});

		it('should return "rgba(1, 2, 3, 0.4)" -> "rgba(1, 2, 3, 0.4)"', () => {
			const toString = Color.fromString('rgba(1, 2, 3, 0.4)').toString();
			expect(toString).toBe('rgba(1, 2, 3, 0.4)');
		});

		it('should return "rgba(0, 1, 2, 0.87)" -> "rgba(0, 1, 2, 0.87)"', () => {
			const toString = Color.fromString('rgba(0, 1, 2, 0.87)').toString();
			expect(toString).toBe('rgba(0, 1, 2, 0.87)');
		});

		it('should return "rgb(0, 1.1, 256)" -> "rgb(0, 1, 255)"', () => {
			const toString = Color.fromString('rgb(0, 1.1, 256)').toString();
			expect(toString).toBe('rgb(0, 1, 255)');
		});

		it('should return "rgb(0%, 50%, 100%)" -> "rgb(0, 128, 255)"', () => {
			const toString = Color.fromString('rgb(0%, 50%, 100%)').toString();
			expect(toString).toBe('rgb(0, 128, 255)');
		});

		it('should return "rgba(6.25%, 12.5%, 25%, 50%)" -> "rgba(16, 32, 64, 0.5)"', () => {
			const toString = Color.fromString('rgba(6.25%, 12.5%, 25%, 50%)').toString();
			expect(toString).toBe('rgba(16, 32, 64, 0.5)');
		});
	});

	describe('Hex Types', () => {
		it('should return "#DEF" -> "rgb(221, 238, 255)"', () => {
			const toString = Color.fromString('#DEF').toString();
			expect(toString).toBe('rgb(221, 238, 255)');
		});

		it('should return "#F012" -> "rgb(0, 17, 34)"', () => {
			const toString = Color.fromString('#F012').toString();
			expect(toString).toBe('rgb(0, 17, 34)');
		});

		it('should return "#CDEF" -> "rgba(221, 238, 255, 0.8)"', () => {
			const toString = Color.fromString('#CDEF').toString();
			expect(toString).toBe('rgba(221, 238, 255, 0.8)');
		});

		it('should return "#012345" -> "rgb(1, 35, 69)"', () => {
			const toString = Color.fromString('#012345').toString();
			expect(toString).toBe('rgb(1, 35, 69)');
		});

		it('should return "#ccddeeff" -> "rgba(221, 238, 255, 0.8)"', () => {
			const toString = Color.fromString('#ccddeeff').toString();
			expect(toString).toBe('rgba(221, 238, 255, 0.8)');
		});
	});

	describe('HTML Named Colors', () => {
		it('should return "white" -> "rgb(255, 255, 255)"', () => {
			const toString = Color.fromString('white').toString();
			expect(toString).toBe('rgb(255, 255, 255)');
		});

		it('should return "navajowhite" -> "rgb(255, 222, 173)"', () => {
			const toString = Color.fromString('navajowhite').toString();
			expect(toString).toBe('rgb(255, 222, 173)');
		});

		it('should return "transparent" -> "transparent"', () => {
			const toString = Color.fromString('transparent').toString();
			expect(toString).toBe('transparent');
		});

		it('should return "rgb(1, 2, 3, 0.0)" -> "transparent"', () => {
			const toString = Color.fromString('rgb(1, 2, 3, 0.0)').toString();
			expect(toString).toBe('transparent');
		});
	});

	describe('Invalid Color Input', () => {
		it('should catch "rgba(0, 0, 0, 0, 0)"', () => {
			const invalidColor = 'rgba(0, 0, 0, 0, 0)';
			expect(() => Color.fromString(invalidColor))
				.toThrow(new InvalidColorString(invalidColor));
		});

		it('should catch "#FFFFF"', () => {
			const invalidColor = '#FFFFF';
			expect(() => Color.fromString(invalidColor))
				.toThrow(new InvalidColorString(invalidColor));
		});

		it('should catch "navajo white"', () => {
			const invalidColor = 'navajo white';
			expect(() => Color.fromString(invalidColor))
				.toThrow(new InvalidColorString(invalidColor));
		});

		it('should catch "hsl(197.6, 97.3%, 43.9%)"', () => {
			const invalidColor = 'hsl(197.6, 97.3%, 43.9%)';
			expect(() => Color.fromString(invalidColor))
				.toThrow(new InvalidColorString(invalidColor));
		});
	});

	describe('Object Prototype Methods', () => {
		it('should return "rgb(127, 128, 129)".withAlpha(0.5) -> "rgba(127, 128, 129, 0.5)"', () => {
			const toString = Color.fromString('rgb(127, 128, 129)').withAlpha(0.5).toString();
			expect(toString).toBe('rgba(127, 128, 129, 0.5)');
		});

		it('should return "rgba(0, 1, 2, 0.87)".withAlpha(1) -> "rgb(0, 1, 2)"', () => {
			const toString = Color.fromString('rgba(0, 1, 2, 0.87)').withAlpha(1).toString();
			expect(toString).toBe('rgb(0, 1, 2)');
		});

		it('should return "rgb(3, 157, 221)".imposeOn("white") -> "rgb(3, 157, 221)"', () => {
			const backgroundColor = Color.fromString('white');
			const foregroundColor = Color.fromString('rgb(3, 157, 221)');
			expect(foregroundColor.imposeOn(backgroundColor).toString()).toBe('rgb(3, 157, 221)');
		});

		it('should return "rgba(3, 157, 221, 0.5)".imposeOn("black") -> "rgb(2, 79, 111)"', () => {
			const backgroundColor = Color.fromString('black');
			const foregroundColor = Color.fromString('rgba(3, 157, 221, 0.5)');
			expect(foregroundColor.imposeOn(backgroundColor).toString()).toBe('rgb(2, 79, 111)');
		});

		it('should return "transparent".imposeOn("rgb(198, 110, 78)") -> "rgb(198, 110, 78)"', () => {
			const backgroundColor = Color.fromString('rgb(198, 110, 78)');
			const foregroundColor = Color.fromString('transparent');
			expect(foregroundColor.imposeOn(backgroundColor).toString()).toBe('rgb(198, 110, 78)');
		});
	});
});
