import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { Color } from 'src/app/core/colors/models/color.model';

export const LightTheme = new ColorTheme(
	Color.fromString('white'),
	Color.fromString('whitesmoke'), // alpha 0.04
	Color.fromString('lightgrey'), // alpha 0.17
	Color.fromString('rgba(0, 0, 0, 0.87)'),
	Color.fromString('#616f77'),
	Color.fromString('#95a2a9'),
	Color.fromString('white'),
	'light',
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
	'dark',
	'dark-theme',
	'Dark',
);

export const PaperTheme = new ColorTheme(
	Color.fromString('#fffbf7'),
	Color.fromString('#fff6ec'),
	Color.fromString('#ffefdd'),
	Color.fromString('rgba(0, 0, 0, 0.87)'),
	Color.fromString('#616f77'),
	Color.fromString('#95a2a9'),
	Color.fromString('#fffbf7'),
	'light',
	'paper-theme',
	'Paper',
);

export const DarkerTheme = new ColorTheme(
	Color.fromString('black'),
	Color.fromString('#121212'),
	Color.fromString('#212121'),
	Color.fromString('rgb(234, 240, 244)'),
	Color.fromString('lightgrey'),
	Color.fromString('rgba(255, 255, 255, 0.7)'),
	Color.fromString('black'),
	'dark',
	'darker-theme',
	'Darker',
);
