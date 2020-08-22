import { BaseColorTheme } from './base-color-theme.model';
import { Color } from '../color.model';

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
