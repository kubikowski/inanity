export enum TypefaceClassification {
	SERIF = 'SERIF',
	SANS_SERIF = 'SANS_SERIF',
	MONOSPACE = 'MONOSPACE',
}

export function getTypefaceClassificationCss(classification: TypefaceClassification): string {
	return `var(--${ classification.toLowerCase().replaceAll('_', '-') }-font)`;
}
