export class ColorTheme {
	private constructor(
		public displayName: string,
		public colorLightest: string,
		public colorLighter: string,
		public colorLight: string,
		public colorDefault: string,
		public colorDark: string,
		public colorDarker: string,
		public colorDarkest: string,
	) { }

	public static from(displayName: string, paletteName: string): ColorTheme {
		return new ColorTheme(
			displayName,
			`--${paletteName}-theme-lightest`,
			`--${paletteName}-theme-lighter`,
			`--${paletteName}-theme-light`,
			`--${paletteName}-theme-default`,
			`--${paletteName}-theme-dark`,
			`--${paletteName}-theme-darker`,
			`--${paletteName}-theme-darkest`,
		);
	}

	public static getThemes(): ColorTheme[] {
		const themes: {displayName: string, paletteName: string}[] = [
			{displayName: 'Aqua', paletteName: 'blue'},
			{displayName: 'Moss', paletteName: 'green'},
		];

		return themes.map(theme => ColorTheme.from(theme.displayName, theme.paletteName));
	}
}
