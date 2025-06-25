import { BaseColorTheme } from 'src/app/core/colors/models/color-themes/base-color-theme.model';
import { Color } from 'src/app/core/colors/models/color.model';

export class ColorTheme extends BaseColorTheme {

	// Light Static App Colors
	public static readonly infoColorLight = Color.fromString('#00627A'); /* IntelliJ light theme method color */
	public static readonly successColorLight = Color.fromString('#067D17'); /* Intellij light theme string color */
	public static readonly warningColorLight = Color.fromString('#C47233'); /* Intellij light theme error mark color */
	public static readonly dangerColorLight = Color.fromString('#F50000'); /* IntelliJ light theme unknown symbol color */

	// Dark Static App Colors
	public static readonly infoColorDark = Color.fromString('#57AAF7'); /* IntelliJ dark theme method color */
	public static readonly successColorDark = Color.fromString('#6AAB73'); /* Intellij dark theme string color */
	public static readonly warningColorDark = Color.fromString('#CF8E6D'); /* Intellij dark theme keyword color */
	public static readonly dangerColorDark = Color.fromString('#F75464'); /* IntelliJ dark theme bad character color */

	// Static App Colors
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
			(prefers === 'light') ? ColorTheme.infoColorLight.toString() : ColorTheme.infoColorDark.toString(),
			(prefers === 'light') ? ColorTheme.successColorLight.toString() : ColorTheme.successColorDark.toString(),
			(prefers === 'light') ? ColorTheme.warningColorLight.toString() : ColorTheme.warningColorDark.toString(),
			(prefers === 'light') ? ColorTheme.dangerColorLight.toString() : ColorTheme.dangerColorDark.toString(),

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
