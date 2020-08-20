export class ColorPalette {
	private constructor(
		public colorLightest: string,
		public colorLighter: string,
		public colorLight: string,
		public colorDefault: string,
		public colorDark: string,
		public colorDarker: string,
		public colorDarkest: string,
		public paletteName?: string,
		public displayName?: string,
	) { }

	public static readonly RootPalette = new ColorPalette(
		'--theme-color-lightest',
		'--theme-color-lighter',
		'--theme-color-light',
		'--theme-color-default',
		'--theme-color-dark',
		'--theme-color-darker',
		'--theme-color-darkest',
	);

	public static readonly BluePalette = new ColorPalette(
		'#51d4ff',
		'#1ab4f5',
		'#00b3ee',
		'#039ddd',
		'#0487cc',
		'#047ec5',
		'#036ea6',
		'blue-palette',
		'Aqua',
	);

	public static readonly GreenPalette = new ColorPalette(
		'#70ee7a',
		'#3cd070',
		'#50c878',
		'#3cb371',
		'#00a86b',
		'#009060',
		'#00755e',
		'green-palette',
		'Moss',
	);

	public static readonly PinkPalette = new ColorPalette(
		'#fdb4c8',
		'#fda1ba',
		'#fc8eac',
		'#fb7b9e',
		'#fa4274',
		'#f92e66',
		'#d4063e',
		'pink-palette',
		'Flamingo',
	);

	public static readonly OrangePalette = new ColorPalette(
		'#ffe808',
		'#ffcc00',
		'#ffa812',
		'#ff7f00',
		'#f94d00',
		'#e62020',
		'#c90016',
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
}
