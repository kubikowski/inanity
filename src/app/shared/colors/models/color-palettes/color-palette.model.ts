import { BaseColorPalette } from './base-color-palette.model';
import { Color } from '../color.model';

export class ColorPalette extends BaseColorPalette {
	public constructor(
		private lightestColor: Color,
		private lighterColor: Color,
		private lightColor: Color,
		private defaultColor: Color,
		private darkColor: Color,
		private darkerColor: Color,
		private darkestColor: Color,
		public paletteName: string,
		public displayName: string,
	) {
		super(null, null, null, null, null, null, null, null);
	}

	/** Inverse the palette's values, so that the darkest color becomes the lightest and so on.
	 * @return - a new ColorPalette with inverse values
	 */
	public getInverse(): ColorPalette {
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
		);
	}

	/** region colorString getters & setters */
	get colorLightest(): string {
		return this.lightestColor.toString();
	}

	set colorLightest(colorLightest: string) {
		if (colorLightest !== null)
			this.lightestColor = Color.fromString(colorLightest);
	}

	get colorLighter(): string {
		return this.lighterColor.toString();
	}

	set colorLighter(colorLighter: string) {
		if (colorLighter !== null)
			this.lighterColor = Color.fromString(colorLighter);
	}

	get colorLight(): string {
		return this.lightColor.toString();
	}

	set colorLight(colorLight: string) {
		if (colorLight !== null)
			this.lightColor = Color.fromString(colorLight);
	}

	get colorDefault(): string {
		return this.defaultColor.toString();
	}

	set colorDefault(colorDefault: string) {
		if (colorDefault !== null)
			this.defaultColor = Color.fromString(colorDefault);
	}

	get colorDark(): string {
		return this.darkColor.toString();
	}

	set colorDark(colorDark: string) {
		if (colorDark !== null)
			this.darkColor = Color.fromString(colorDark);
	}

	get colorDarker(): string {
		return this.darkerColor.toString();
	}

	set colorDarker(colorDarker: string) {
		if (colorDarker !== null)
			this.darkerColor = Color.fromString(colorDarker);
	}

	get colorDarkest(): string {
		return this.darkestColor.toString();
	}

	set colorDarkest(colorDarkest: string) {
		if (colorDarkest !== null)
			this.darkestColor = Color.fromString(colorDarkest);
	}

	get colorSelected(): string {
		return this.defaultColor.withAlpha(0.25).toString();
	}

	set colorSelected(colorSelected: string) { }
	/** endregion colorString getters & setters */
}
