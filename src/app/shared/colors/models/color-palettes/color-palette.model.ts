import { BaseColorPalette } from './base-color-palette.model';
import { Color } from '../color.model';

export class ColorPalette extends BaseColorPalette {
	public constructor(
		private readonly lightestColor: Color,
		private readonly lighterColor: Color,
		private readonly lightColor: Color,
		private readonly defaultColor: Color,
		private readonly darkColor: Color,
		private readonly darkerColor: Color,
		private readonly darkestColor: Color,
		public readonly paletteName: string,
		public readonly displayName: string,
	) {
		super(
			lightestColor.toString(),
			lighterColor.toString(),
			lightColor.toString(),
			defaultColor.toString(),
			darkColor.toString(),
			darkerColor.toString(),
			darkestColor.toString(),
			defaultColor.withAlpha(0.25).toString(),
		);
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
}
