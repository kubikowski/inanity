import { Color, InvalidColorString } from './color.model';

describe('Color', () => {

	/** region Test fromString & toString with RGB types */
	it('should return "rgb(128, 128, 128)" -> "rgb(128, 128, 128)"', () => {
		const toString = Color.fromString('rgb(128, 128, 128)').toString();
		expect(toString).toBe('rgb(128, 128, 128)');
	});

	it('should return "rgba(255,255, 255,  1)" -> "rgb(255, 255, 255)"', () => {
		const toString = Color.fromString('rgba(255,255, 255,  1)').toString();
		expect(toString).toBe('rgb(255, 255, 255)');
	});

	it('should return "rgba(1, 2, 3, 0.4)" -> "rgba(1, 2, 3, 0.4)"', () => {
		const toString = Color.fromString('rgba(1, 2, 3, 0.4)').toString();
		expect(toString).toBe('rgba(1, 2, 3, 0.4)');
	});

	it('should return "rgba(0, 0, 0, 0.87)" -> "rgba(0, 0, 0, 0.87)"', () => {
		const toString = Color.fromString('rgba(0, 0, 0, 0.87)').toString();
		expect(toString).toBe('rgba(0, 0, 0, 0.87)');
	});

	it('should return "rgb(0, 0.1, 256)" -> "rgb(0, 0, 255)"', () => {
		const toString = Color.fromString('rgb(0, 0.1, 256)').toString();
		expect(toString).toBe('rgb(0, 0, 255)');
	});
	/** endregion */

	/** region Test fromString & toString with Hex types */
	it('should return "#FFF" -> "rgb(255, 255, 255)"', () => {
		const toString = Color.fromString('#FFF').toString();
		expect(toString).toBe('rgb(255, 255, 255)');
	});

	it('should return "#F000" -> "rgb(0, 0, 0)"', () => {
		const toString = Color.fromString('#F000').toString();
		expect(toString).toBe('rgb(0, 0, 0)');
	});

	it('should return "#C000" -> "rgba(0, 0, 0, 0.8)"', () => {
		const toString = Color.fromString('#C000').toString();
		expect(toString).toBe('rgba(0, 0, 0, 0.8)');
	});

	it('should return "#012345" -> "rgb(1, 35, 69)"', () => {
		const toString = Color.fromString('#012345').toString();
		expect(toString).toBe('rgb(1, 35, 69)');
	});

	it('should return "#CC00DD00" -> "rgba(0, 221, 0, 0.8)"', () => {
		const toString = Color.fromString('#CC00DD00').toString();
		expect(toString).toBe('rgba(0, 221, 0, 0.8)');
	});
	/** endregion */

	/** region Test fromString & toString with Named Colors */
	it('should return "white" -> "rgb(255, 255, 255)"', () => {
		const toString = Color.fromString('white').toString();
		expect(toString).toBe('rgb(255, 255, 255)');
	});

	it('should return "navajowhite" -> "rgb(255, 222, 173)"', () => {
		const toString = Color.fromString('navajowhite').toString();
		expect(toString).toBe('rgb(255, 222, 173)');
	});
	/** endregion */

	/** region Test Invalid Input */
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
	/** endregion */
});
