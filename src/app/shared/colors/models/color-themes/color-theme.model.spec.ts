import { LightTheme } from './color-themes.constant';
import { Color } from '../color.model';

describe('Color Theme', () => {

	describe('Internal Color Objects', () => {
		it('should contain correct backgroundColor', () => {
			const { backgroundColor } = LightTheme;
			expect(backgroundColor).toBeInstanceOf(Color);
			expect(backgroundColor.toString()).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct accentColor', () => {
			const { accentColor } = LightTheme;
			expect(accentColor).toBeInstanceOf(Color);
			expect(accentColor.toString()).toBe('rgb(245, 245, 245)');
		});

		it('should contain correct disabledColor', () => {
			const { disabledColor } = LightTheme;
			expect(disabledColor).toBeInstanceOf(Color);
			expect(disabledColor.toString()).toBe('rgb(211, 211, 211)');
		});

		it('should contain correct contrastColor', () => {
			const { contrastColor } = LightTheme;
			expect(contrastColor).toBeInstanceOf(Color);
			expect(contrastColor.toString()).toBe('rgba(0, 0, 0, 0.87)');
		});
	});

	describe('Base Color Theme Values', () => {
		it('should contain correct colorBackground', () => {
			const { colorBackground } = LightTheme;
			expect(colorBackground).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct colorAccent', () => {
			const { colorAccent } = LightTheme;
			expect(colorAccent).toBe('rgb(245, 245, 245)');
		});

		it('should contain correct colorDisabled', () => {
			const { colorDisabled } = LightTheme;
			expect(colorDisabled).toBe('rgb(211, 211, 211)');
		});

		it('should contain correct colorContrast', () => {
			const { colorContrast } = LightTheme;
			expect(colorContrast).toBe('rgba(0, 0, 0, 0.87)');
		});

		it('should contain correct colorHover', () => {
			const { colorHover } = LightTheme;
			expect(colorHover).toBe('rgba(0, 0, 0, 0.15)');
		});
	});
});
