import { ColorPalette } from './color-palette.model';
import { Color } from '../color.model';

export const BluePalette = new ColorPalette(
	Color.fromString('#51d4ff'),
	Color.fromString('#1ab4f5'),
	Color.fromString('#00b3ee'),
	Color.fromString('#039ddd'),
	Color.fromString('#0487cc'),
	Color.fromString('#047ec5'),
	Color.fromString('#036ea6'),
	'blue-palette',
	'Aqua',
);

export const GreenPalette = new ColorPalette(
	Color.fromString('#70ee7a'),
	Color.fromString('#3cd070'),
	Color.fromString('#50c878'),
	Color.fromString('#3cb371'),
	Color.fromString('#00a86b'),
	Color.fromString('#009060'),
	Color.fromString('#00755e'),
	'green-palette',
	'Moss',
);

export const PinkPalette = new ColorPalette(
	Color.fromString('#fdb4c8'),
	Color.fromString('#fda1ba'),
	Color.fromString('#fc8eac'),
	Color.fromString('#fb7b9e'),
	Color.fromString('#fa4274'),
	Color.fromString('#f92e66'),
	Color.fromString('#d4063e'),
	'pink-palette',
	'Flamingo',
);

export const OrangePalette = new ColorPalette(
	Color.fromString('#ffe808'),
	Color.fromString('#ffcc00'),
	Color.fromString('#ffa812'),
	Color.fromString('#ff7f00'),
	Color.fromString('#f94d00'),
	Color.fromString('#e62020'),
	Color.fromString('#c90016'),
	'orange-palette',
	'Combustion',
);

export const ColorPalettes = [
	BluePalette,
	GreenPalette,
	PinkPalette,
	OrangePalette,
] as const;