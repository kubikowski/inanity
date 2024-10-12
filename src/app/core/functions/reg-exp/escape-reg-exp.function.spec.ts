import { escapeRegExp } from 'src/app/core/functions/reg-exp/escape-reg-exp.function';

describe('escapeRegExp', () => {

	it('word', () => {
		const result = escapeRegExp('word');
		expect(result).toBe('word');
	});

	it('/slashes/', () => {
		const result = escapeRegExp('/slashes/');
		expect(result).toBe('\\/slashes\\/');
	});

	it('\\backslashes\\', () => {
		const result = escapeRegExp('\\backslashes\\');
		expect(result).toBe('\\\\backslashes\\\\');
	});

	it('\\border of word', () => {
		const result = escapeRegExp('\\border of word');
		expect(result).toBe('\\\\border of word');
	});

	it('(?:non-capturing)', () => {
		const result = escapeRegExp('(?:non-capturing)');
		expect(result).toBe('\\(\\?\\:non-capturing\\)');

		const expected = new RegExp(`${escapeRegExp('(?:')  }([^)]+)`).exec('(?:non-capturing)')?.[1];
		expect(expected).toBe('non-capturing');
	});

	it('(?=positive-lookahead)', () => {
		const result = escapeRegExp('(?=positive-lookahead)');
		expect(result).toBe('\\(\\?\\=positive-lookahead\\)');

		const expected = new RegExp(`${escapeRegExp('(?=')  }([^)]+)`).exec('(?=positive-lookahead)')?.[1];
		expect(expected).toBe('positive-lookahead');
	});

	it('(?<=positive-lookbehind)', () => {
		const result = escapeRegExp('(?<=positive-lookbehind)');
		expect(result).toBe('\\(\\?<\\=positive-lookbehind\\)');

		const expected = new RegExp(`${escapeRegExp('(?<=')  }([^)]+)`).exec('(?<=positive-lookbehind)')?.[1];
		expect(expected).toBe('positive-lookbehind');
	});

	it('(?!negative-lookahead)', () => {
		const result = escapeRegExp('(?!negative-lookahead)');
		expect(result).toBe('\\(\\?\\!negative-lookahead\\)');

		const expected = new RegExp(`${escapeRegExp('(?!')  }([^)]+)`).exec('(?!negative-lookahead)')?.[1];
		expect(expected).toBe('negative-lookahead');
	});

	it('(?<!negative-lookbehind)', () => {
		const result = escapeRegExp('(?<!negative-lookbehind)');
		expect(result).toBe('\\(\\?<\\!negative-lookbehind\\)');

		const expected = new RegExp(`${escapeRegExp('(?<!')  }([^)]+)`).exec('(?<!negative-lookbehind)')?.[1];
		expect(expected).toBe('negative-lookbehind');
	});

	it('[character class]', () => {
		const result = escapeRegExp('[\\w]+');
		expect(result).toBe('\\[\\\\w\\]\\+');

		const expected = new RegExp(`${escapeRegExp('[')  }([^\\]]+)`).exec('[character class]')?.[1];
		expect(expected).toBe('character class');
	});

	it('<div>', () => {
		const expected = new RegExp(escapeRegExp('<div>')).exec('<td><div></td>')?.[0];
		expect(expected).toBe('<div>');
	});

	it('\\n\\r\\t', () => {
		const result = escapeRegExp('\\n\\r\\t');
		expect(result).toBe('\\\\n\\\\r\\\\t');
	});

	it('\n\r\t', () => {
		const result = escapeRegExp('\n\r\t');
		expect(result).toBe('\n\r\t');
	});

	it('{5,2}', () => {
		const result = escapeRegExp('{5,2}');
		expect(result).toBe('\\{5,2\\}');
	});

	it('/([.*+?^=!:${}()|[\\]\\/\\\\])/g', () => {
		const result = escapeRegExp('/([.*+?^=!:${}()|[\\]\\/\\\\])/g');
		expect(result).toBe('\\/\\(\\[\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\\\\\]\\\\\\\/\\\\\\\\\\]\\)\\/g');
	});
});
