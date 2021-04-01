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

export const RedPalette = new ColorPalette(
	Color.fromString('#f4364c'), // Pantone 1787 C
	Color.fromString('#ef3340'), // Pantone Red 032 C
	Color.fromString('#d50032'), // Pantone 199 C
	Color.fromString('#cd001a'), // Pantone 3546 C
	Color.fromString('#b80f0a'),
	Color.fromString('#9b111e'),
	Color.fromString('#7e0b02'),
	'red-palette',
	'Crimson',
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

export const TanPalette = new ColorPalette(
	Color.fromString('#f5e1a4'), // Pantone 7401 C
	Color.fromString('#fcd299'), // Pantone 7507 C
	Color.fromString('#b58150'), // Pantone 729 C
	Color.fromString('#c66e4e'), // Pantone 7618 C
	Color.fromString('#b46a55'), // Pantone 7522 C
	Color.fromString('#785135'), // Pantone 7568 C
	Color.fromString('#623b2a'), // Pantone 477 C
	'tan-palette',
	'Clay',
);

export const ColorPalettes = [
	BluePalette,
	GreenPalette,
	PinkPalette,
	RedPalette,
	OrangePalette,
	TanPalette,
] as const;
