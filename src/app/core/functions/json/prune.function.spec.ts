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

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeTrue();
		expect('nullParam2'			in prunedObject).toBeTrue();
		expect('emptyStringParam'	in prunedObject).toBeTrue();
		expect('emptyArrayParam'	in prunedObject).toBeTrue();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
	});

	it('should remove all undefined and null fields when setting the pruneNulls flag to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true });

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeFalse();
		expect('nullParam2'			in prunedObject).toBeFalse();
		expect('emptyStringParam'	in prunedObject).toBeTrue();
		expect('emptyArrayParam'	in prunedObject).toBeTrue();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
	});

	it('should remove all undefined and empty array fields when setting the pruneEmptyArrays flag to true', () => {
		const prunedObject = prune(testObject, { pruneEmptyArrays: true });

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeTrue();
		expect('nullParam2'			in prunedObject).toBeTrue();
		expect('emptyStringParam'	in prunedObject).toBeTrue();
		expect('emptyArrayParam'	in prunedObject).toBeFalse();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
	});

	it('should remove all undefined, null & empty array fields when setting the pruneNulls & pruneEmptyArrays flags to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true, pruneEmptyArrays: true });

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeFalse();
		expect('nullParam2'			in prunedObject).toBeFalse();
		expect('emptyStringParam'	in prunedObject).toBeTrue();
		expect('emptyArrayParam'	in prunedObject).toBeFalse();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
	});

	it('should remove all undefined and empty string fields when setting the pruneEmptyStrings flags to true', () => {
		const prunedObject = prune(testObject, { pruneEmptyStrings: true });

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeTrue();
		expect('nullParam2'			in prunedObject).toBeTrue();
		expect('emptyStringParam'	in prunedObject).toBeFalse();
		expect('emptyArrayParam'	in prunedObject).toBeTrue();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
	});

	it('should remove all undefined, null, empty array & empty string fields when setting the pruneNulls, pruneEmptyArrays & pruneEmptyStrings flags to true', () => {
		const prunedObject = prune(testObject, { pruneNulls: true, pruneEmptyArrays: true, pruneEmptyStrings: true });

		expect('stringParam'		in prunedObject).toBeTrue();
		expect('numberParam'		in prunedObject).toBeTrue();
		expect('arrayParam'			in prunedObject).toBeTrue();
		expect('objectParam'		in prunedObject).toBeTrue();
		expect('nullParam1'			in prunedObject).toBeFalse();
		expect('nullParam2'			in prunedObject).toBeFalse();
		expect('emptyStringParam'	in prunedObject).toBeFalse();
		expect('emptyArrayParam'	in prunedObject).toBeFalse();
		expect('undefinedParam1'	in prunedObject).toBeFalse();
		expect('undefinedParam2'	in prunedObject).toBeFalse();
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
		expect('f' in prunedObject).toBeTrue();
	});
});
