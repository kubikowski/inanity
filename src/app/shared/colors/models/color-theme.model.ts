export class ColorTheme {
	private constructor(
		public colorBackground: string,
		public colorAccent: string,
		public colorDisabled: string,
		public colorContrast: string,
		public themeName?: string,
		public displayName?: string,
	) { }

	public static readonly RootTheme = new ColorTheme(
		'--theme-color-background',
		'--theme-color-accent',
		'--theme-color-disabled',
		'--theme-color-contrast',
	);

	public static readonly LightTheme = new ColorTheme(
		'#ffffff',
		'#f5f5f5',
		'#d3d3d3',
		'rgba(0, 0, 0, 0.87)',
		'light-theme',
		'Light',
	);

	public static readonly DarkTheme = new ColorTheme(
		'#212121',
		'#424242',
		'#636363',
		'#ffffff',
		'dark-theme',
		'Dark',
	);

	public static readonly Themes = [
		ColorTheme.LightTheme,
		ColorTheme.DarkTheme,
	];
}
