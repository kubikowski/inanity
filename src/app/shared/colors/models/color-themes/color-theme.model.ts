import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { Color } from 'src/app/shared/colors/models/color.model';

export class ColorTheme extends BaseColorTheme {
	public constructor(
		public readonly backgroundColor: Color,
		public readonly accentColor: Color,
		public readonly disabledColor: Color,
		public readonly contrastColor: Color,
		public readonly themeName: string,
		public readonly displayName: string,
	) {
		super(
			backgroundColor.toString(),
			accentColor.toString(),
			disabledColor.toString(),
			contrastColor.toString(),
			contrastColor.withAlpha(0.15).toString(),
		);
	}
}
