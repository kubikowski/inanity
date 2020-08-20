import { BaseColorTheme } from './base-color-theme.model';
import { Color } from './color.model';

export class ColorTheme extends BaseColorTheme {
	private constructor(
		private backgroundColor: Color,
		private accentColor: Color,
		private disabledColor: Color,
		private contrastColor: Color,
		public themeName?: string,
		public displayName?: string,
	) {
		super(
			backgroundColor.toString(),
			accentColor.toString(),
			disabledColor.toString(),
			contrastColor.toString(),
		);
	}

	public static readonly LightTheme = new ColorTheme(
		Color.fromString('#ffffff'),
		Color.fromString('#f5f5f5'),
		Color.fromString('#d3d3d3'),
		Color.fromString('rgba(0, 0, 0, 0.87)'),
		'light-theme',
		'Light',
	);

	public static readonly DarkTheme = new ColorTheme(
		Color.fromString('#212121'),
		Color.fromString('#424242'),
		Color.fromString('#636363'),
		Color.fromString('#ffffff'),
		'dark-theme',
		'Dark',
	);

	public static readonly Themes = [
		ColorTheme.LightTheme,
		ColorTheme.DarkTheme,
	];

	/** region colorString getters & setters */
	get colorBackground(): string {
		return this.backgroundColor.toString();
	}

	set colorBackground(colorBackground: string) {
		this.backgroundColor = Color.fromString(colorBackground);
	}

	get colorAccent(): string {
		return this.accentColor.toString();
	}

	set colorAccent(colorAccent: string) {
		this.accentColor = Color.fromString(colorAccent);
	}

	get colorDisabled(): string {
		return this.disabledColor.toString();
	}

	set colorDisabled(colorDisabled: string) {
		this.disabledColor = Color.fromString(colorDisabled);
	}

	get colorContrast(): string {
		return this.contrastColor.toString();
	}

	set colorContrast(colorContrast: string) {
		this.contrastColor = Color.fromString(colorContrast);
	}
	/** endregion colorString getters & setters */
}
