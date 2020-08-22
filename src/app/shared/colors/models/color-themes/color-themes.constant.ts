import { ColorTheme } from './color-theme.model';
import { Color } from '../color.model';

export const LightTheme = new ColorTheme(
	Color.fromString('white'),
	Color.fromString('whitesmoke'),
	Color.fromString('lightgrey'),
	Color.fromString('rgba(0, 0, 0, 0.87)'),
	'light-theme',
	'Light',
);

export const DarkTheme = new ColorTheme(
	Color.fromString('#212121'),
	Color.fromString('#424242'),
	Color.fromString('#636363'),
	Color.fromString('white'),
	'dark-theme',
	'Dark',
);

export const ColorThemes = [
	LightTheme,
	DarkTheme,
] as const;
