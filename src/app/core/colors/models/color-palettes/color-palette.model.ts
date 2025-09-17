import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { LightTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { Color } from 'src/app/core/colors/models/color.model';
import type { Tuple } from 'src/app/core/types/tuple.type';

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

			/* M3 Palette Colors */
			...ColorPalette.getM3Palette(lightestColor, lighterColor, lightColor, defaultColor, darkColor, darkerColor, darkestColor, theme),

			/* Selected Background Colors */
			defaultColor.withAlpha(0.20).imposeOn(theme.defaultBackgroundColor).toString(),
			defaultColor.withAlpha(0.20).toString(),
		);
	}

	private static getM3Palette(
		lightestColor: Color, lighterColor: Color, lightColor: Color, defaultColor: Color,
		darkColor: Color, darkerColor: Color, darkestColor: Color, theme: ColorTheme,
	): Tuple<string, 16> {
		const [ _lightest, _lighter, _light, _default, _dark, _darker, _darkest ] = (theme.prefers === 'light')
			? [ lightestColor, lighterColor, lightColor, defaultColor, darkColor, darkerColor, darkestColor ]
			: [ darkestColor, darkerColor, darkColor, defaultColor, lightColor, lighterColor, lightestColor ];
		const [ _darkBackground, _lightBackground ] = (theme.prefers === 'light')
			? [ theme.darkTextColor, theme.defaultBackgroundColor ]
			: [ theme.defaultBackgroundColor, theme.darkTextColor ];

		return [
			_darkest.withAlpha(0.00).imposeOn(_darkBackground).toString(),
			_darkest.withAlpha(0.20).imposeOn(_darkBackground).toString(),
			_darkest.withAlpha(0.50).imposeOn(_darkBackground).toString(),
			_darkest.withAlpha(0.75).imposeOn(_darkBackground).toString(),
			_darkest.toString(),
			_darker.toString(),
			_dark.toString(),
			_default.toString(),
			_light.toString(),
			_lighter.toString(),
			_lightest.toString(),
			_lightest.withAlpha(0.50).imposeOn(_lightBackground).toString(),
			_lightest.withAlpha(0.20).imposeOn(_lightBackground).toString(),
			_lightest.withAlpha(0.10).imposeOn(_lightBackground).toString(),
			_lightest.withAlpha(0.05).imposeOn(_lightBackground).toString(),
			_lightest.withAlpha(0.00).imposeOn(_lightBackground).toString(),
		];
	}

	/**
	 * Makes a direct copy of the palette, with a theme applied.
	 *
	 * @param theme - the new ColorTheme to base generated palette variables on.
	 * @return - a new ColorPalette with copied values
	 */
	public copy(theme: ColorTheme): ColorPalette {
		return new ColorPalette(
			this.lightestColor,
			this.lighterColor,
			this.lightColor,
			this.defaultColor,
			this.darkColor,
			this.darkerColor,
			this.darkestColor,
			this.paletteName,
			this.displayName,
			theme,
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

	public transparent(alpha: number): ColorPalette {
		return new ColorPalette(
			this.lightestColor.withAlpha(alpha),
			this.lighterColor.withAlpha(alpha),
			this.lightColor.withAlpha(alpha),
			this.defaultColor.withAlpha(alpha),
			this.darkColor.withAlpha(alpha),
			this.darkerColor.withAlpha(alpha),
			this.darkestColor.withAlpha(alpha),
			this.paletteName,
			this.displayName,
			this.theme,
		);
	}
}
