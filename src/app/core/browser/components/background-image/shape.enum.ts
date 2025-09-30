import { ValueOf } from 'src/app/core/types/value-of.type';

export enum Shape {
	CIRCLE = 'circle',
	ELLIPSE = 'ellipse',
	PARALLELOGRAM = 'parallelogram',
	SQUIRCLE = 'squircle',
	WAVE = 'wave',
}

/**
 * This is mildly maddening.
 * The 'initial type' of a TS string enum is not a concretely typed object.
 * So you can't directly bind the raw string values. Which would be nice.
 */
export type ShapeValue = ValueOf<typeof Shape>
	| 'circle'
	| 'ellipse'
	| 'parallelogram'
	| 'squircle'
	| 'wave'
;
