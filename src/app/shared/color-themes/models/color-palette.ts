export class ColorPalette {
	private constructor(
		public colorLightest: string,
		public colorLighter: string,
		public colorLight: string,
		public colorDefault: string,
		public colorDark: string,
		public colorDarker: string,
		public colorDarkest: string,

		public displayName?: string,
	) { }

	public static from(paletteName: string, displayName: string): ColorPalette {
		return new ColorPalette(
			`--${paletteName}-theme-lightest`,
			`--${paletteName}-theme-lighter`,
			`--${paletteName}-theme-light`,
			`--${paletteName}-theme-default`,
			`--${paletteName}-theme-dark`,
			`--${paletteName}-theme-darker`,
			`--${paletteName}-theme-darkest`,
			displayName,
		);
	}

	public static getRootPalette(): ColorPalette {
		return new ColorPalette(
			'--theme-color-lightest',
			'--theme-color-lighter',
			'--theme-color-light',
			'--theme-color-default',
			'--theme-color-dark',
			'--theme-color-darker',
			'--theme-color-darkest',
		);
	}

	public static getPalettes(): ColorPalette[] {
		const palettes: {paletteName: string, displayName: string}[] = [
			{paletteName: 'blue', displayName: 'Aqua'},
			{paletteName: 'green', displayName: 'Moss'},
			{paletteName: 'orange', displayName: 'Combustion'},
		];

		return palettes.map(palette => ColorPalette.from(palette.paletteName, palette.displayName));
	}
}
