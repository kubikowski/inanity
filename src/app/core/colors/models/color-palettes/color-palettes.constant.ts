import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { Color } from 'src/app/core/colors/models/color.model';

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
	Color.fromString('#3cd070'), // UFO Green
	Color.fromString('#50c878'), // Paris Green
	Color.fromString('#3cb371'), // Medium Sea Green
	Color.fromString('#00a86b'), // Jade
	Color.fromString('#009060'),
	Color.fromString('#00755e'), // Pantone 568 CP [Tropical Rain Forest]
	'green-palette',
	'Moss',
);

export const PurplePalette = new ColorPalette(
	Color.fromString('#dbd5eb'),
	Color.fromString('#cdc4e3'),
	Color.fromString('#b2a4d4'), // Pantone 15-3817 TPX Lavender
	Color.fromString('#9e8dc9'),
	Color.fromString('#826db0'),
	Color.fromString('#7058a4'),
	Color.fromString('#5f4b8b'), // Pantone 18-3838 TCX Ultra Violet
	'purple-palette',
	'Lavender',
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

/** rejected in favor of flamingo */
export const RhubarbPalette = new ColorPalette(
	Color.fromString('#fdb4c8'),
	Color.fromString('#fda1ba'),
	Color.fromString('#fc8eac'),
	Color.fromString('#e96a97'), // Pantone 16-2126 TCX [Azalea Pink]
	Color.fromString('#b61c50'), // Pantone 18-1950 TCX [Jazzy]
	Color.fromString('#a52350'), // Pantone 19-2039 TCX [Granita]
	Color.fromString('#77202f'), // Pantone 19-1652 TCX [Rhubarb]
	'pink-palette',
	'Flamingo',
);

export const RedPalette = new ColorPalette(
	Color.fromString('#f77786'),
	Color.fromString('#f66878'),
	Color.fromString('#f5495d'),
	Color.fromString('#f4364c'), // Pantone 1787 C
	Color.fromString('#ef3340'), // Pantone Red 032 C
	Color.fromString('#d50032'), // Pantone 199 C
	Color.fromString('#cd001a'), // Pantone 3546 C
	'red-palette',
	'Crimson',
);

/** rejected */
export const OrangePalette = new ColorPalette(
	Color.fromString('#ffe808'),
	Color.fromString('#ffcc00'), // Tangerine Yellow
	Color.fromString('#ffa812'), // Dark Tangerine
	Color.fromString('#ff7f00'), // Orange (color wheel)
	Color.fromString('#f94d00'), // Tangelo
	Color.fromString('#e62020'), // Lust
	Color.fromString('#c90016'), // Harvard Crimson
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
	PurplePalette,
	PinkPalette,
	RedPalette,
	TanPalette,
] as const;
