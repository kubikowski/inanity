import { BaseColorTheme } from 'src/app/core/colors/models/color-themes/base-color-theme.model';
import { Color } from 'src/app/core/colors/models/color.model';

export class ColorTheme extends BaseColorTheme {
	public static readonly infoColor = Color.fromString('#00b3ee');
	public static readonly successColor = Color.fromString('#5cb85c');
	// public static readonly successColor = Color.fromString('#6AAB73'); // Intellij Dark Theme String Color
	// public static readonly successColor = Color.fromString('#0a7248'); // Pantone PMS 18-6032 TSX [Putting Green]
	public static readonly warningColor = Color.fromString('#f0ad4e');
	// public static readonly warningColor = Color.fromString('#ff6c2f'); // Pantone 021 U [Orange]
	// public static readonly warningColor = Color.fromString('#ff6d2b'); // Pantone 15-1360 TN [Shocking Orange]
	// public static readonly warningColor = Color.fromString('#c7622b'); // Pantone 16-1448 TPX [Burnt Orange]
	// public static readonly warningColor = Color.fromString('#ffad4a'); // Pantone 14-1050 TPX [Marigold]
	public static readonly dangerColor = Color.fromString('#d9534f');
	// public static readonly dangerColor = Color.fromString('#d93744'); // Pantone 17-1663 TCX [Bittersweet]
	public static readonly shadowColor = Color.fromString('black');

	public constructor(
		public readonly defaultBackgroundColor: Color,
		public readonly accentBackgroundColor: Color,
		public readonly disabledBackgroundColor: Color,

		public readonly darkTextColor: Color,
		public readonly defaultTextColor: Color,
		public readonly disabledTextColor: Color,
		public readonly lightTextColor: Color,

		public readonly prefers: 'light' | 'dark',
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
