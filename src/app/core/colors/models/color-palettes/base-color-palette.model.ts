export class BaseColorPalette {
	protected constructor(
		public readonly colorLightest: string,
		public readonly colorLighter: string,
		public readonly colorLight: string,
		public readonly colorDefault: string,
		public readonly colorDark: string,
		public readonly colorDarker: string,
		public readonly colorDarkest: string,

		public readonly colorSelectedBackground: string,
		public readonly colorSelectedBackgroundTransparent: string,
	) { }

	public static readonly CssPaletteVariables = new BaseColorPalette(
		'--lightest-theme-color',
		'--lighter-theme-color',
		'--light-theme-color',
		'--default-theme-color',
		'--dark-theme-color',
		'--darker-theme-color',
		'--darkest-theme-color',

		'--selected-background-color',
		'--selected-background-color-transparent',
	);
}
