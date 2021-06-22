export class BaseColorTheme {
	protected constructor(
		public readonly colorInfo: string,
		public readonly colorSuccess: string,
		public readonly colorWarning: string,
		public readonly colorDanger: string,

		public readonly colorDefaultBackground: string,
		public readonly colorAccentBackground: string,
		public readonly colorDisabledBackground: string,

		public readonly colorDarkText: string,
		public readonly colorDefaultText: string,
		public readonly colorDisabledText: string,
		public readonly colorLightText: string,

		public readonly colorHoverBackground: string,
		public readonly colorHoverBackgroundTransparent: string,

		public readonly colorDarkBorder: string,
		public readonly colorBorder: string,

		public readonly colorShadow: string,
	) { }

	public static readonly CssThemeVariables = new BaseColorTheme(
		/* Static App Colors */
		'--info-color',
		'--success-color',
		'--warning-color',
		'--danger-color',

		/* Background Colors */
		'--default-background-color',
		'--accent-background-color',
		'--disabled-background-color',

		/* Text Colors */
		'--dark-text-color',
		'--default-text-color',
		'--disabled-text-color',
		'--light-text-color',

		/* Hover Colors */
		'--hover-background-color',
		'--hover-background-color-transparent',

		/* Border Colors */
		'--dark-border-color',
		'--border-color',

		/* Shadow Colors */
		'--shadow-color',
	);
}
