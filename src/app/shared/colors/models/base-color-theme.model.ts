export class BaseColorTheme {
	protected constructor(
		public colorBackground: string,
		public colorAccent: string,
		public colorDisabled: string,
		public colorContrast: string,
	) { }

	public static readonly RootTheme = new BaseColorTheme(
		'--theme-color-background',
		'--theme-color-accent',
		'--theme-color-disabled',
		'--theme-color-contrast',
	);
}
