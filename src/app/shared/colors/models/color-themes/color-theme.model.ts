import { BaseColorTheme } from './base-color-theme.model';
import { Color } from '../color.model';

export class ColorTheme extends BaseColorTheme {
	public constructor(
		private backgroundColor: Color,
		private accentColor: Color,
		private disabledColor: Color,
		private contrastColor: Color,
		public themeName: string,
		public displayName: string,
	) {
		super(null, null, null, null);
	}

	/** region colorString getters & setters */
	get colorBackground(): string {
		return this.backgroundColor.toString();
	}

	set colorBackground(colorBackground: string) {
		if (colorBackground !== null)
			this.backgroundColor = Color.fromString(colorBackground);
	}

	get colorAccent(): string {
		return this.accentColor.toString();
	}

	set colorAccent(colorAccent: string) {
		if (colorAccent !== null)
			this.accentColor = Color.fromString(colorAccent);
	}

	get colorDisabled(): string {
		return this.disabledColor.toString();
	}

	set colorDisabled(colorDisabled: string) {
		if (colorDisabled !== null)
			this.disabledColor = Color.fromString(colorDisabled);
	}

	get colorContrast(): string {
		return this.contrastColor.toString();
	}

	set colorContrast(colorContrast: string) {
		if (colorContrast !== null)
			this.contrastColor = Color.fromString(colorContrast);
	}
	/** endregion colorString getters & setters */
}
