import { TypefaceClassification } from './typeface-classification.enum';
import { Typeface } from './typeface.model';

export const EB_GARAMOND = Typeface.from({
	name: 'EB Garamond',
	classification: TypefaceClassification.SERIF,
	attribution: {
		author: 'The EB Garamond Project Authors',
		copyrightYear: 2017,
		downloadLink: 'https://github.com/octaviopardo/EBGaramond12',
		license: 'SIL Open Font License, Version 1.1',
		licenseLink: 'https://openfontlicense.org',
	},
});

export const LATO = Typeface.from({
	name: 'Lato',
	classification: TypefaceClassification.SANS_SERIF,
	attribution: {
		author: 'Łukasz Dziedzic',
		copyrightYear: 2010,
		downloadLink: 'https://www.latofonts.com',
		license: 'SIL Open Font License, Version 1.1',
		licenseLink: 'https://openfontlicense.org',
	},
});

export const VICTOR_MONO = Typeface.from({
	name: 'Victor Mono',
	classification: TypefaceClassification.MONOSPACE,
	attribution: {
		author: 'Rune Bjørnerås',
		copyrightYear: 2021,
		downloadLink: 'https://github.com/rubjo/victor-mono',
		license: 'SIL Open Font License, Version 1.1',
		licenseLink: 'https://openfontlicense.org',
	},
});

export const Typefaces = [
	EB_GARAMOND,
	LATO,
	VICTOR_MONO,
] as const;
