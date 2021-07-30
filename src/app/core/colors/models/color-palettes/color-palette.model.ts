import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { LightTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { Color } from 'src/app/core/colors/models/color.model';

export class ColorPalette extends BaseColorPalette {
	public constructor(
		public readonly lightestColor: Color,
		public readonly lighterColor: Color,
		public readonly lightColor: Color,
		public readonly defaultColor: Color,
		public readonly darkColor: Color,
		public readonly darkerColor: Color,
		public readonly darkestColor: Color,

		public readonly paletteName: string,
		public readonly displayName: string,

		public readonly theme = LightTheme,
	) {
		super(
			/* Palette Colors */
			lightestColor.toString(),
			lighterColor.toString(),
			lightColor.toString(),
			defaultColor.toString(),
			darkColor.toString(),
			darkerColor.toString(),
			darkestColor.toString(),

			/* Selected Background Colors */
			defaultColor.withAlpha(0.15).imposeOn(theme.defaultBackgroundColor).toString(),
			defaultColor.withAlpha(0.15).toString(),
		);
	}

	/**
	 * Inverse the palette's values, so that the darkest color becomes the lightest and so on.
	 *
	 * @param theme - the new ColorTheme to base generated palette variables on.
	 * @return - a new ColorPalette with inverse values
	 */
	public inverse(theme: ColorTheme): ColorPalette {
		return new ColorPalette(
			this.darkestColor,
			this.darkerColor,
			this.darkColor,
			this.defaultColor,
			this.lightColor,
			this.lighterColor,
			this.lightestColor,
			this.paletteName,
			this.displayName,
			theme,
		);
	}
}
