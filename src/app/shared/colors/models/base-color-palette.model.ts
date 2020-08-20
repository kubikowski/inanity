export class BaseColorPalette {
	protected constructor(
		public colorLightest: string,
		public colorLighter: string,
		public colorLight: string,
		public colorDefault: string,
		public colorDark: string,
		public colorDarker: string,
		public colorDarkest: string,
	) { }

	public static readonly RootPalette = new BaseColorPalette(
		'--theme-color-lightest',
		'--theme-color-lighter',
		'--theme-color-light',
		'--theme-color-default',
		'--theme-color-dark',
		'--theme-color-darker',
		'--theme-color-darkest',
	);
}
