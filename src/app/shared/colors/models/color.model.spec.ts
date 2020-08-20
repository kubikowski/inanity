import { Color } from './color.model';

describe('Color', () => {

	/** region Test static factory constructors */
	it('should construct Color from', () => {
		const color = Color.from(255, 255, 255);
		expect(color).toBeTruthy();
	});

	it('should construct Color fromString', () => {
		const color = Color.fromString('#FFF');
		expect(color).toBeTruthy();
	});
	/** endregion */

	/** region Test fromString & toString with RGB types */
	it('should return "rgba(255,255,255)" -> "rgb(255, 255, 255)"', () => {
		const toString = Color.fromString('rgba(255,255,255)').toString();
		expect(toString).toBe('rgb(255, 255, 255)');
	});

	it('should return "rgba(1, 2, 3, 4)" -> "rgba(1, 2, 3, 4)"', () => {
		const toString = Color.fromString('rgba(1, 2, 3, 4)').toString();
		expect(toString).toBe('rgba(1, 2, 3, 4)');
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

	it('should return "#C000" -> "rgba(0, 0, 0, 204)"', () => {
		const toString = Color.fromString('#C000').toString();
		expect(toString).toBe('rgba(0, 0, 0, 204)');
	});

	it('should return "#012345" -> "rgb(1, 35, 69)"', () => {
		const toString = Color.fromString('#012345').toString();
		expect(toString).toBe('rgb(1, 35, 69)');
	});

	it('should return "#BB00DD00" -> "rgba(0, 221, 0, 187)"', () => {
		const toString = Color.fromString('#BB00DD00').toString();
		expect(toString).toBe('rgba(0, 221, 0, 187)');
	});
	/** endregion */
});
