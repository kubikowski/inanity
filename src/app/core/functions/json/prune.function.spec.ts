import { prune } from 'src/app/core/functions/json/prune.function';

describe('prune', () => {
	const testObject = {
		stringParam: 'value',
		numberParam: 100,
		arrayParam: [ 1, 2, 3 ],
		objectParam: { a: 1, b: 2 },
		nullParam1: null,
		nullParam2: null,
		emptyStringParam: '',
		emptyArrayParam: [],
		undefinedParam1: undefined,
		undefinedParam2: undefined,
	};

	it('should remove all undefined fields and retain all other fields by default', () => {
		const prunedObject = prune(testObject);

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(true);
		expect('nullParam2'			in prunedObject).toBe(true);
		expect('emptyStringParam'	in prunedObject).toBe(true);
		expect('emptyArrayParam'	in prunedObject).toBe(true);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should remove all undefined and null fields when setting the pruneNulls flag to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true });

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(false);
		expect('nullParam2'			in prunedObject).toBe(false);
		expect('emptyStringParam'	in prunedObject).toBe(true);
		expect('emptyArrayParam'	in prunedObject).toBe(true);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should remove all undefined and empty array fields when setting the pruneEmptyArrays flag to true', () => {
		const prunedObject = prune(testObject, { pruneEmptyArrays: true });

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(true);
		expect('nullParam2'			in prunedObject).toBe(true);
		expect('emptyStringParam'	in prunedObject).toBe(true);
		expect('emptyArrayParam'	in prunedObject).toBe(false);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should remove all undefined, null & empty array fields when setting the pruneNulls & pruneEmptyArrays flags to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true, pruneEmptyArrays: true });

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(false);
		expect('nullParam2'			in prunedObject).toBe(false);
		expect('emptyStringParam'	in prunedObject).toBe(true);
		expect('emptyArrayParam'	in prunedObject).toBe(false);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should remove all undefined and empty string fields when setting the pruneEmptyStrings flags to true', () => {
		const prunedObject = prune(testObject, { pruneEmptyStrings: true });

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(true);
		expect('nullParam2'			in prunedObject).toBe(true);
		expect('emptyStringParam'	in prunedObject).toBe(false);
		expect('emptyArrayParam'	in prunedObject).toBe(true);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should remove all undefined, null, empty array & empty string fields when setting the pruneNulls, pruneEmptyArrays & pruneEmptyStrings flags to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true, pruneEmptyArrays: true, pruneEmptyStrings: true });

		expect('stringParam'		in prunedObject).toBe(true);
		expect('numberParam'		in prunedObject).toBe(true);
		expect('arrayParam'			in prunedObject).toBe(true);
		expect('objectParam'		in prunedObject).toBe(true);
		expect('nullParam1'			in prunedObject).toBe(false);
		expect('nullParam2'			in prunedObject).toBe(false);
		expect('emptyStringParam'	in prunedObject).toBe(false);
		expect('emptyArrayParam'	in prunedObject).toBe(false);
		expect('undefinedParam1'	in prunedObject).toBe(false);
		expect('undefinedParam2'	in prunedObject).toBe(false);
	});

	it('should consider strings containing *only* whitespace as "empty string"', () => {
		const test = {
			a: '   ',
			b: '\t',
			c: '\r\n',
			d: '   \n',
			e: '\t  \t',
			f: 'real value',
		};

		const prunedObject = prune(test, { pruneEmptyStrings: true });

		expect(Object.keys(prunedObject).length).toEqual(1);
		expect('f' in prunedObject).toBe(true);
	});
});
