import { LightTheme } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { Color } from 'src/app/shared/colors/models/color.model';

describe('Color Theme', () => {

	describe('Internal Color Objects', () => {
		it('should contain correct defaultBackgroundColor', () => {
			const { defaultBackgroundColor } = LightTheme;
			expect(defaultBackgroundColor).toBeInstanceOf(Color);
			expect(defaultBackgroundColor.toString()).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct accentBackgroundColor', () => {
			const { accentBackgroundColor } = LightTheme;
			expect(accentBackgroundColor).toBeInstanceOf(Color);
			expect(accentBackgroundColor.toString()).toBe('rgb(245, 245, 245)');
		});

		it('should contain correct disabledBackgroundColor', () => {
			const { disabledBackgroundColor } = LightTheme;
			expect(disabledBackgroundColor).toBeInstanceOf(Color);
			expect(disabledBackgroundColor.toString()).toBe('rgb(211, 211, 211)');
		});

		it('should contain correct darkTextColor', () => {
			const { darkTextColor } = LightTheme;
			expect(darkTextColor).toBeInstanceOf(Color);
			expect(darkTextColor.toString()).toBe('rgba(0, 0, 0, 0.87)');
		});

		it('should contain correct defaultTextColor', () => {
			const { defaultTextColor } = LightTheme;
			expect(defaultTextColor).toBeInstanceOf(Color);
			expect(defaultTextColor.toString()).toBe('rgb(97, 111, 119)');
		});

		it('should contain correct disabledTextColor', () => {
			const { disabledTextColor } = LightTheme;
			expect(disabledTextColor).toBeInstanceOf(Color);
			expect(disabledTextColor.toString()).toBe('rgb(149, 162, 169)');
		});

		it('should contain correct lightTextColor', () => {
			const { lightTextColor } = LightTheme;
			expect(lightTextColor).toBeInstanceOf(Color);
			expect(lightTextColor.toString()).toBe('rgb(255, 255, 255)');
		});
	});

	describe('Base Color Theme Values', () => {
		it('should contain correct colorInfo', () => {
			const { colorInfo } = LightTheme;
			expect(colorInfo).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct colorSuccess', () => {
			const { colorSuccess } = LightTheme;
			expect(colorSuccess).toBe('rgb(92, 184, 92)');
		});

		it('should contain correct colorWarning', () => {
			const { colorWarning } = LightTheme;
			expect(colorWarning).toBe('rgb(240, 173, 78)');
		});

		it('should contain correct colorDanger', () => {
			const { colorDanger } = LightTheme;
			expect(colorDanger).toBe('rgb(217, 83, 79)');
		});

		it('should contain correct colorDefaultBackground', () => {
			const { colorDefaultBackground } = LightTheme;
			expect(colorDefaultBackground).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct colorAccentBackground', () => {
			const { colorAccentBackground } = LightTheme;
			expect(colorAccentBackground).toBe('rgb(245, 245, 245)');
		});

		it('should contain correct colorDisabledBackground', () => {
			const { colorDisabledBackground } = LightTheme;
			expect(colorDisabledBackground).toBe('rgb(211, 211, 211)');
		});

		it('should contain correct colorDarkText', () => {
			const { colorDarkText } = LightTheme;
			expect(colorDarkText).toBe('rgba(0, 0, 0, 0.87)');
		});

		it('should contain correct colorDefaultText', () => {
			const { colorDefaultText } = LightTheme;
			expect(colorDefaultText).toBe('rgb(97, 111, 119)');
		});

		it('should contain correct colorDisabledText', () => {
			const { colorDisabledText } = LightTheme;
			expect(colorDisabledText).toBe('rgb(149, 162, 169)');
		});

		it('should contain correct colorLightText', () => {
			const { colorLightText } = LightTheme;
			expect(colorLightText).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct colorHoverBackground', () => {
			const { colorHoverBackground } = LightTheme;
			expect(colorHoverBackground).toBe('rgb(235, 235, 235)');
		});

		it('should contain correct colorHoverBackgroundTransparent', () => {
			const { colorHoverBackgroundTransparent } = LightTheme;
			expect(colorHoverBackgroundTransparent).toBe('rgba(0, 0, 0, 0.08)');
		});

		it('should contain correct colorDarkBorder', () => {
			const { colorDarkBorder } = LightTheme;
			expect(colorDarkBorder).toBe('rgb(212, 212, 212)');
		});

		it('should contain correct colorBorder', () => {
			const { colorBorder } = LightTheme;
			expect(colorBorder).toBe('rgba(0, 0, 0, 0.1)');
		});

		it('should contain correct colorShadow', () => {
			const { colorShadow } = LightTheme;
			expect(colorShadow).toBe('rgba(0, 0, 0, 0.2)');
		});
	});
});
