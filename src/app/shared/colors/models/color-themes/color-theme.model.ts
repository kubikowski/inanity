import { BaseColorTheme } from './base-color-theme.model';
import { Color } from '../color.model';

export class ColorTheme extends BaseColorTheme {
	public constructor(
		private readonly backgroundColor: Color,
		private readonly accentColor: Color,
		private readonly disabledColor: Color,
		private readonly contrastColor: Color,
		public readonly themeName: string,
		public readonly displayName: string,
	) {
		super(
			backgroundColor.toString(),
			accentColor.toString(),
			disabledColor.toString(),
			contrastColor.toString(),
		);
	}
}
