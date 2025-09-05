import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { DarkerTheme, DarkTheme, LightTheme, PaperTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';

export abstract class ColorThemeUtil {
	public static readonly default = PaperTheme;
	public static readonly all = [
		LightTheme,
		PaperTheme,
		DarkTheme,
		DarkerTheme,
	] as const;

	public static named(themeName: string | null): ColorTheme {
		return this.all.find(theme => theme.themeName === themeName)
			?? this.default;
	}
}
