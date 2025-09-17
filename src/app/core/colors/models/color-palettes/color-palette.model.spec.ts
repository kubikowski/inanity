import { BluePalette } from 'src/app/core/colors/models/color-palettes/color-palettes.constant';
import { DarkTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { Color } from 'src/app/core/colors/models/color.model';

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

		it('should contain correct color000', () => {
			const { color000 } = BluePalette;
			expect(color000).toBe('rgb(0, 0, 0)');
		});

		it('should contain correct color010', () => {
			const { color010 } = BluePalette;
			expect(color010).toBe('rgb(1, 22, 33)');
		});

		it('should contain correct color020', () => {
			const { color020 } = BluePalette;
			expect(color020).toBe('rgb(2, 55, 83)');
		});

		it('should contain correct color025', () => {
			const { color025 } = BluePalette;
			expect(color025).toBe('rgb(2, 83, 125)');
		});

		it('should contain correct color030', () => {
			const { color030 } = BluePalette;
			expect(color030).toBe('rgb(3, 110, 166)');
		});

		it('should contain correct color035', () => {
			const { color035 } = BluePalette;
			expect(color035).toBe('rgb(4, 126, 197)');
		});

		it('should contain correct color040', () => {
			const { color040 } = BluePalette;
			expect(color040).toBe('rgb(4, 135, 204)');
		});

		it('should contain correct color050', () => {
			const { color050 } = BluePalette;
			expect(color050).toBe('rgb(3, 157, 221)');
		});

		it('should contain correct color060', () => {
			const { color060 } = BluePalette;
			expect(color060).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct color070', () => {
			const { color070 } = BluePalette;
			expect(color070).toBe('rgb(26, 180, 245)');
		});

		it('should contain correct color080', () => {
			const { color080 } = BluePalette;
			expect(color080).toBe('rgb(81, 212, 255)');
		});

		it('should contain correct color090', () => {
			const { color090 } = BluePalette;
			expect(color090).toBe('rgb(168, 234, 255)');
		});

		it('should contain correct color095', () => {
			const { color095 } = BluePalette;
			expect(color095).toBe('rgb(220, 246, 255)');
		});

		it('should contain correct color098', () => {
			const { color098 } = BluePalette;
			expect(color098).toBe('rgb(238, 251, 255)');
		});

		it('should contain correct color099', () => {
			const { color099 } = BluePalette;
			expect(color099).toBe('rgb(246, 253, 255)');
		});

		it('should contain correct color100', () => {
			const { color100 } = BluePalette;
			expect(color100).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct colorSelected', () => {
			const { colorSelectedBackground } = BluePalette;
			expect(colorSelectedBackground).toBe('rgb(205, 235, 248)');
		});

		it('should contain correct colorSelectedOpaque', () => {
			const { colorSelectedBackgroundTransparent } = BluePalette;
			expect(colorSelectedBackgroundTransparent).toBe('rgba(3, 157, 221, 0.2)');
		});
	});

	describe('ColorPalette.inverse()', () => {
		const bluePaletteInverse = BluePalette.inverse(DarkTheme);

		it('should contain correct colorLightest', () => {
			const { colorLightest } = bluePaletteInverse;
			expect(colorLightest).toBe('rgb(3, 110, 166)');
		});

		it('should contain correct colorLighter', () => {
			const { colorLighter } = bluePaletteInverse;
			expect(colorLighter).toBe('rgb(4, 126, 197)');
		});

		it('should contain correct colorLight', () => {
			const { colorLight } = bluePaletteInverse;
			expect(colorLight).toBe('rgb(4, 135, 204)');
		});

		it('should contain correct colorDefault', () => {
			const { colorDefault } = bluePaletteInverse;
			expect(colorDefault).toBe('rgb(3, 157, 221)');
		});

		it('should contain correct colorDark', () => {
			const { colorDark } = bluePaletteInverse;
			expect(colorDark).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct colorDarker', () => {
			const { colorDarker } = bluePaletteInverse;
			expect(colorDarker).toBe('rgb(26, 180, 245)');
		});

		it('should contain correct colorDarkest', () => {
			const { colorDarkest } = bluePaletteInverse;
			expect(colorDarkest).toBe('rgb(81, 212, 255)');
		});

		it('should contain correct color000', () => {
			const { color000 } = bluePaletteInverse;
			expect(color000).toBe('rgb(33, 33, 33)');
		});

		it('should contain correct color010', () => {
			const { color010 } = bluePaletteInverse;
			expect(color010).toBe('rgb(27, 48, 60)');
		});

		it('should contain correct color020', () => {
			const { color020 } = bluePaletteInverse;
			expect(color020).toBe('rgb(18, 72, 100)');
		});

		it('should contain correct color025', () => {
			const { color025 } = bluePaletteInverse;
			expect(color025).toBe('rgb(11, 91, 133)');
		});

		it('should contain correct color030', () => {
			const { color030 } = bluePaletteInverse;
			expect(color030).toBe('rgb(3, 110, 166)');
		});

		it('should contain correct color035', () => {
			const { color035 } = bluePaletteInverse;
			expect(color035).toBe('rgb(4, 126, 197)');
		});

		it('should contain correct color040', () => {
			const { color040 } = bluePaletteInverse;
			expect(color040).toBe('rgb(4, 135, 204)');
		});

		it('should contain correct color050', () => {
			const { color050 } = bluePaletteInverse;
			expect(color050).toBe('rgb(3, 157, 221)');
		});

		it('should contain correct color060', () => {
			const { color060 } = bluePaletteInverse;
			expect(color060).toBe('rgb(0, 179, 238)');
		});

		it('should contain correct color070', () => {
			const { color070 } = bluePaletteInverse;
			expect(color070).toBe('rgb(26, 180, 245)');
		});

		it('should contain correct color080', () => {
			const { color080 } = bluePaletteInverse;
			expect(color080).toBe('rgb(81, 212, 255)');
		});

		it('should contain correct color090', () => {
			const { color090 } = bluePaletteInverse;
			expect(color090).toBe('rgb(168, 234, 255)');
		});

		it('should contain correct color095', () => {
			const { color095 } = bluePaletteInverse;
			expect(color095).toBe('rgb(220, 246, 255)');
		});

		it('should contain correct color098', () => {
			const { color098 } = bluePaletteInverse;
			expect(color098).toBe('rgb(238, 251, 255)');
		});

		it('should contain correct color099', () => {
			const { color099 } = bluePaletteInverse;
			expect(color099).toBe('rgb(246, 253, 255)');
		});

		it('should contain correct color100', () => {
			const { color100 } = bluePaletteInverse;
			expect(color100).toBe('rgb(255, 255, 255)');
		});

		it('should contain correct colorSelectedBackground', () => {
			const { colorSelectedBackground } = bluePaletteInverse;
			expect(colorSelectedBackground).toBe('rgb(27, 58, 71)');
		});

		it('should contain correct colorSelectedBackgroundTransparent', () => {
			const { colorSelectedBackgroundTransparent } = bluePaletteInverse;
			expect(colorSelectedBackgroundTransparent).toBe('rgba(3, 157, 221, 0.2)');
		});
	});
});
