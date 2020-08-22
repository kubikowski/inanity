export class BaseColorTheme {
	protected constructor(
		public readonly colorBackground: string,
		public readonly colorAccent: string,
		public readonly colorDisabled: string,
		public readonly colorContrast: string,
		public readonly colorHover: string,
	) { }

	public static readonly CssThemeVariables = new BaseColorTheme(
		'--theme-color-background',
		'--theme-color-accent',
		'--theme-color-disabled',
		'--theme-color-contrast',
		'--theme-color-hover',
	);
}
