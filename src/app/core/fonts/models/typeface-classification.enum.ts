export enum TypefaceClassification {
	SERIF = 'SERIF',
	SANS_SERIF = 'SANS_SERIF',
	MONOSPACE = 'MONOSPACE',
}

export abstract class TypefaceClassificationUtil {

	public static getTypeVariable(classification: TypefaceClassification): `var(--${ string }-font)` {
		return `var(--${ this.kebab(classification) }-font)`;
	}

	public static getTypeDeclaration(classification: TypefaceClassification): `--${ string }-type` {
		return `--${ this.kebab(classification) }-type`;
	}

	private static kebab(classification: TypefaceClassification): string {
		return classification.toLowerCase().replaceAll('_', '-');
	}
}
