import { BaseColorPalette } from './base-color-palette.model';
import { Color } from './color.model';

export class ColorPalette extends BaseColorPalette {
	private constructor(
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
		super(
			lightestColor.toString(),
			lighterColor.toString(),
			lightColor.toString(),
			defaultColor.toString(),
			darkColor.toString(),
			darkerColor.toString(),
			darkestColor.toString(),
		);
	}

	public static readonly BluePalette = new ColorPalette(
		Color.fromString('#51d4ff'),
		Color.fromString('#1ab4f5'),
		Color.fromString('#00b3ee'),
		Color.fromString('#039ddd'),
		Color.fromString('#0487cc'),
		Color.fromString('#047ec5'),
		Color.fromString('#036ea6'),
		'blue-palette',
		'Aqua',
	);

	public static readonly GreenPalette = new ColorPalette(
		Color.fromString('#70ee7a'),
		Color.fromString('#3cd070'),
		Color.fromString('#50c878'),
		Color.fromString('#3cb371'),
		Color.fromString('#00a86b'),
		Color.fromString('#009060'),
		Color.fromString('#00755e'),
		'green-palette',
		'Moss',
	);

	public static readonly PinkPalette = new ColorPalette(
		Color.fromString('#fdb4c8'),
		Color.fromString('#fda1ba'),
		Color.fromString('#fc8eac'),
		Color.fromString('#fb7b9e'),
		Color.fromString('#fa4274'),
		Color.fromString('#f92e66'),
		Color.fromString('#d4063e'),
		'pink-palette',
		'Flamingo',
	);

	public static readonly OrangePalette = new ColorPalette(
		Color.fromString('#ffe808'),
		Color.fromString('#ffcc00'),
		Color.fromString('#ffa812'),
		Color.fromString('#ff7f00'),
		Color.fromString('#f94d00'),
		Color.fromString('#e62020'),
		Color.fromString('#c90016'),
		'orange-palette',
		'Combustion',
	);

	public static readonly Palettes = [
		ColorPalette.BluePalette,
		ColorPalette.GreenPalette,
		ColorPalette.PinkPalette,
		ColorPalette.OrangePalette,
	];

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
		this.lightestColor = Color.fromString(colorLightest);
	}

	get colorLighter(): string {
		return this.lighterColor.toString();
	}

	set colorLighter(colorLighter: string) {
		this.lighterColor = Color.fromString(colorLighter);
	}

	get colorLight(): string {
		return this.lightColor.toString();
	}

	set colorLight(colorLight: string) {
		this.lightColor = Color.fromString(colorLight);
	}

	get colorDefault(): string {
		return this.defaultColor.toString();
	}

	set colorDefault(colorDefault: string) {
		this.defaultColor = Color.fromString(colorDefault);
	}

	get colorDark(): string {
		return this.darkColor.toString();
	}

	set colorDark(colorDark: string) {
		this.darkColor = Color.fromString(colorDark);
	}

	get colorDarker(): string {
		return this.darkerColor.toString();
	}

	set colorDarker(colorDarker: string) {
		this.darkerColor = Color.fromString(colorDarker);
	}

	get colorDarkest(): string {
		return this.darkestColor.toString();
	}

	set colorDarkest(colorDarkest: string) {
		this.darkestColor = Color.fromString(colorDarkest);
	}
	/** endregion colorString getters & setters */
}
