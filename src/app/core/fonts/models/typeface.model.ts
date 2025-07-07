import { TypefaceClassification } from './typeface-classification.enum';

export class Typeface {
	public constructor(
		public readonly name: string,
		public readonly classification: TypefaceClassification,
		public readonly attribution: TypefaceAttribution,
	) { }

	public static from(typeface: Typeface): Typeface {
		return new Typeface(
			typeface.name,
			typeface.classification,
			typeface.attribution,
		);
	}
}

export interface TypefaceAttribution {
	readonly author: string;
	readonly copyrightYear: number;
	readonly downloadLink: string;
	readonly license: string;
	readonly licenseLink: string;
}
