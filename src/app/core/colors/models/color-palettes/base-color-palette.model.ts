export type ColorKey = keyof BaseColorPalette;

export class BaseColorPalette {
	public static readonly CssVariables = this.getCssVariables();

	protected constructor(
		public readonly colorLightest: string,
		public readonly colorLighter: string,
		public readonly colorLight: string,
		public readonly colorDefault: string,
		public readonly colorDark: string,
		public readonly colorDarker: string,
		public readonly colorDarkest: string,

		public readonly color000: string,
		public readonly color010: string,
		public readonly color020: string,
		public readonly color025: string,
		public readonly color030: string,
		public readonly color035: string,
		public readonly color040: string,
		public readonly color050: string,
		public readonly color060: string,
		public readonly color070: string,
		public readonly color080: string,
		public readonly color090: string,
		public readonly color095: string,
		public readonly color098: string,
		public readonly color099: string,
		public readonly color100: string,

		public readonly colorSelectedBackground: string,
		public readonly colorSelectedBackgroundTransparent: string,
	) { }

	private static getCssVariables(): BaseColorPalette {
		return new BaseColorPalette(
			'--lightest-theme-color',
			'--lighter-theme-color',
			'--light-theme-color',
			'--default-theme-color',
			'--dark-theme-color',
			'--darker-theme-color',
			'--darkest-theme-color',

			'--theme-color-000',
			'--theme-color-010',
			'--theme-color-020',
			'--theme-color-025',
			'--theme-color-030',
			'--theme-color-035',
			'--theme-color-040',
			'--theme-color-050',
			'--theme-color-060',
			'--theme-color-070',
			'--theme-color-080',
			'--theme-color-090',
			'--theme-color-095',
			'--theme-color-098',
			'--theme-color-099',
			'--theme-color-100',

			'--selected-background-color',
			'--selected-background-color-transparent',
		);
	}

	public static getRandomKey(): ColorKey {
		const colorKeys = Object.keys(BaseColorPalette.CssVariables) as ColorKey[];
		return colorKeys[ Math.floor(Math.random() * 7) ] as ColorKey;
	}
}
