import { Color } from '../color.model';
import { BluePalette } from './color-palettes.constant';

describe('Color Palette', () => {

	describe('Internal Color Objects', () => {
		it('should contain correct lightestColor', () => {
			const { lightestColor } = BluePalette;
			expect(lightestColor).toBeInstanceOf(Color);
			expect(lightestColor.toString()).toBe('rgb(81, 212, 255)');
		});

		it('should contain correct lighterColor', () => {
			const { lighterColor } = BluePalette;
			expect(lighterColor).toBeInstanceOf(Color);
			expect(lighterColor.toString()).toBe('rgb(26, 180, 245)');
		});

		it('should contain correct lightColor', () => {
			const { lightColor } = BluePalette;
			expect(lightColor).toBeInstanceOf(Color);
			expect(lightColor.toString()).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct defaultColor', () => {
			const { defaultColor } = BluePalette;
			expect(defaultColor).toBeInstanceOf(Color);
			expect(defaultColor.toString()).toBe('rgb(3, 157, 221)');
		});

		it('should contain correct darkColor', () => {
			const { darkColor } = BluePalette;
			expect(darkColor).toBeInstanceOf(Color);
			expect(darkColor.toString()).toBe('rgb(4, 135, 204)');
		});

		it('should contain correct darkerColor', () => {
			const { darkerColor } = BluePalette;
			expect(darkerColor).toBeInstanceOf(Color);
			expect(darkerColor.toString()).toBe('rgb(4, 126, 197)');
		});

		it('should contain correct darkestColor', () => {
			const { darkestColor } = BluePalette;
			expect(darkestColor).toBeInstanceOf(Color);
			expect(darkestColor.toString()).toBe('rgb(3, 110, 166)');
		});
	});

	describe('Base Color Palette Values', () => {
		it('should contain correct colorLightest', () => {
			const { colorLightest } = BluePalette;
			expect(colorLightest).toBe('rgb(81, 212, 255)');
		});

		it('should contain correct colorLighter', () => {
			const { colorLighter } = BluePalette;
			expect(colorLighter).toBe('rgb(26, 180, 245)');
		});

		it('should contain correct colorLight', () => {
			const { colorLight } = BluePalette;
			expect(colorLight).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct colorDefault', () => {
			const { colorDefault } = BluePalette;
			expect(colorDefault).toBe('rgb(3, 157, 221)');
		});

		it('should contain correct colorDark', () => {
			const { colorDark } = BluePalette;
			expect(colorDark).toBe('rgb(4, 135, 204)');
		});

		it('should contain correct colorDarker', () => {
			const { colorDarker } = BluePalette;
			expect(colorDarker).toBe('rgb(4, 126, 197)');
		});

		it('should contain correct colorDarkest', () => {
			const { colorDarkest } = BluePalette;
			expect(colorDarkest).toBe('rgb(3, 110, 166)');
		});

		it('should contain correct colorSelected', () => {
			const { colorSelected } = BluePalette;
			expect(colorSelected).toBe('rgba(3, 157, 221, 0.25)');
		});

		it('should contain correct colorSelectedOpaque', () => {
			const { colorSelectedOpaque } = BluePalette;
			expect(colorSelectedOpaque).toBe('rgb(192, 231, 247)');
		});
	});
});
