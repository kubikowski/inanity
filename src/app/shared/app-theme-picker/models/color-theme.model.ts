export class ColorTheme {
	private constructor(
		public colorBackground: string,
		public colorAccent: string,
		public colorDisabled: string,
		public colorContrast: string,
		public themeName?: string,
		public displayName?: string,
	) { }

	public static from(themeName: string, displayName: string): ColorTheme {
		return new ColorTheme(
			`--${themeName}-theme-background`,
			`--${themeName}-theme-accent`,
			`--${themeName}-theme-disabled`,
			`--${themeName}-theme-contrast`,
			`${themeName}-theme`,
			displayName,
		);
	}

	public static getRootTheme(): ColorTheme {
		return new ColorTheme(
			'--theme-color-background',
			'--theme-color-accent',
			'--theme-color-disabled',
			'--theme-color-contrast',
		);
	}

	public static getThemes(): ColorTheme[] {
		const themes: {themeName: string, displayName: string}[] = [
			{themeName: 'light', displayName: 'Light'},
			{themeName: 'dark', displayName: 'Dark'},
		];

		return themes.map(theme => ColorTheme.from(theme.themeName, theme.displayName));
	}
}
