import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { Color } from 'src/app/shared/colors/models/color.model';

export class ColorTheme extends BaseColorTheme {
	static readonly infoColor = Color.fromString('#00b3ee');
	static readonly successColor = Color.fromString('#5cb85c');
	static readonly warningColor = Color.fromString('#f0ad4e');
	static readonly dangerColor = Color.fromString('#d9534f');
	static readonly shadowColor = Color.fromString('black');

	public constructor(
		public readonly defaultBackgroundColor: Color,
		public readonly accentBackgroundColor: Color,
		public readonly disabledBackgroundColor: Color,

		public readonly darkTextColor: Color,
		public readonly defaultTextColor: Color,
		public readonly disabledTextColor: Color,
		public readonly lightTextColor: Color,

		public readonly themeName: string,
		public readonly displayName: string,
	) {
		super(
			/* Static App Colors */
			ColorTheme.infoColor.toString(),
			ColorTheme.successColor.toString(),
			ColorTheme.warningColor.toString(),
			ColorTheme.dangerColor.toString(),

			/* Background Colors */
			defaultBackgroundColor.toString(),
			accentBackgroundColor.toString(),
			disabledBackgroundColor.toString(),

			/* Text Colors */
			darkTextColor.toString(),
			defaultTextColor.toString(),
			disabledTextColor.toString(),
			lightTextColor.toString(),

			/* Hover Colors */
			darkTextColor.withAlpha(0.08).imposeOn(defaultBackgroundColor).toString(),
			darkTextColor.withAlpha(0.08).toString(),

			/* Border Colors */
			darkTextColor.withAlpha(0.17).imposeOn(defaultBackgroundColor).toString(),
			darkTextColor.withAlpha(0.10).toString(),

			/* Shadow Colors */
			ColorTheme.shadowColor.withAlpha(0.20).toString(),
		);
	}
}
