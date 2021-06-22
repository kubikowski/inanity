import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { Color } from 'src/app/shared/colors/models/color.model';

export const LightTheme = new ColorTheme(
	Color.fromString('white'),
	Color.fromString('whitesmoke'), // alpha 0.04
	Color.fromString('lightgrey'), // alpha 0.17
	Color.fromString('rgba(0, 0, 0, 0.87)'),
	Color.fromString('#616f77'),
	Color.fromString('#95a2a9'),
	Color.fromString('white'),
	'light-theme',
	'Light',
);

export const DarkTheme = new ColorTheme(
	Color.fromString('#212121'),
	Color.fromString('#424242'),
	Color.fromString('#636363'),
	Color.fromString('white'),
	Color.fromString('rgb(234, 240, 244)'),
	Color.fromString('rgba(255, 255, 255, 0.7)'),
	Color.fromString('black'),
	'dark-theme',
	'Dark',
);

export const ColorThemes = [
	LightTheme,
	DarkTheme,
] as const;
