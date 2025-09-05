import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { BluePalette, GreenPalette, PinkPalette, PurplePalette, RedPalette, TanPalette } from 'src/app/core/colors/models/color-palettes/color-palettes.constant';

export abstract class ColorPaletteUtil {
	public static readonly default = BluePalette;
	public static readonly all = [
		BluePalette,
		GreenPalette,
		PurplePalette,
		PinkPalette,
		RedPalette,
		TanPalette,
	] as const;

	public static named(paletteName: string | null): ColorPalette {
		return this.all.find(palette => palette.paletteName === paletteName)
			?? this.default;
	}

	public static similar(paletteName: string | null): ColorPalette {
		switch (paletteName) {
			case 'blue-palette':
				return GreenPalette;
			case 'green-palette':
				return BluePalette;

			case 'purple-palette':
				return PinkPalette;
			case 'pink-palette':
				return PurplePalette;

			case 'red-palette':
				return TanPalette;
			case 'tan-palette':
				return RedPalette;

			default:
				return this.default;
		}
	}
}
