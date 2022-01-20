import { JsonInterceptor } from 'src/app/core/functions/json/json-interceptor.funtion';

describe('JSON Interceptor', () => {

	// primitives
	const primitiveString = 'johnny';
	const primitiveNumber = 77;
	const primitiveBoolean = true;
	const primitiveNull = null;
	const primitiveUndefined = undefined;

	// built-ins
	const simpleDate = new Date();
	enum SimpleEnum {
		PRIMARY = 'PRIMARY',
		SECONDARY = 'SECONDARY',
		TERTIARY = 'TERTIARY',
	}

	// built-ins that you should NOT be sending to an API. But we can still test them 🙃 ☃
	function simpleFunction() { return 'stuff'; }
	const simpleSymbol = Symbol('symbol');
	const simpleRegExp = /abc/;
	const simpleError = new Error('error');

	// simple constructs (no nesting, primitive keys)
	const simpleObject = {
		name: primitiveString,
		id: primitiveNumber,
		active: primitiveBoolean,
		time: simpleDate,
		state: SimpleEnum.PRIMARY,
	} as const;
	const simpleArray = [ 1, 2, 3 ] as const;
	const simpleSet = new Set([ 'a', 'b', 'c' ] as const);
	const simpleMap = new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ] as const);

	// complex constructs (with nesting, non-primitive keys)
	const complexObject = {
		object: simpleObject,
		array: simpleArray,
		set: simpleSet,
		map: simpleMap,
	} as const;
	const complexArray = [ simpleObject, simpleArray, simpleSet, simpleMap ] as const;
	const complexSet = new Set([ simpleObject, simpleArray, simpleSet, simpleMap ] as const);
	const complexMap = new Map<unknown, number>([ [ simpleObject, 1 ], [ simpleArray, 2 ], [ simpleSet, 3 ], [ simpleMap, 4 ] ] as const);

	describe('primitives', () => {
		it('primitive string', () => {
			const result = JsonInterceptor(primitiveString);

			expect(result).toBe(primitiveString);
		});

		it('primitive number', () => {
			const result = JsonInterceptor(primitiveNumber);

			expect(result).toBe(primitiveNumber);
		});

		it('primitive boolean', () => {
			const result = JsonInterceptor(primitiveBoolean);

			expect(result).toBe(primitiveBoolean);
		});

		/** will serialize to "null", less than ideal */
		it('primitive null', () => {
			const result = JsonInterceptor(primitiveNull);

			expect(result).toBe(primitiveNull);
		});

		/** will serialize to "undefined", less than ideal */
		it('primitive undefined', () => {
			const result = JsonInterceptor(primitiveUndefined);

			expect(result).toBe(primitiveUndefined);
		});
	});

	/** Not that any of these should be used as request bodies, but I digress. */
	describe('simple built-ins', () => {
		it('simple date', () => {
			const result = JsonInterceptor(simpleDate);

			expect(result).toBe(simpleDate);
		});

		it('simple enum value', () => {
			const result = JsonInterceptor(SimpleEnum.PRIMARY);

			expect(result).toBe(SimpleEnum.PRIMARY);
		});

		/** pls don't send functions to an API */
		it('simple function', () => {
			const result = JsonInterceptor(simpleFunction);

			expect(result).toBe(simpleFunction);
		});

		/** pls don't send symbols to an API */
		it('simple symbol', () => {
			const result = JsonInterceptor(simpleSymbol);

			expect(result).toBe(simpleSymbol);
		});

		/** pls don't send regexps to an API */
		it('simple regexp', () => {
			const result = JsonInterceptor(simpleRegExp);

			expect(result).toBe(simpleRegExp);
		});

		/** pls don't send errors to an API */
		it('simple error', () => {
			const result = JsonInterceptor(simpleError);

			expect(result).toBe(simpleError);
		});
	});

	describe('simple constructs', () => {
		it('simple enum', () => {
			const result = JsonInterceptor(SimpleEnum);

			expect(result).toEqual(SimpleEnum);
		});

		it('simple object', () => {
			const result = JsonInterceptor(simpleObject);

			expect(result).toEqual(simpleObject);
		});

		it('simple array', () => {
			const result = JsonInterceptor(simpleArray);

			expect(result).toEqual(simpleArray);
		});

		it('simple set', () => {
			const result = JsonInterceptor(simpleSet);

			expect(result).toEqual([ ...simpleSet ]);
		});

		it('simple map', () => {
			const result = JsonInterceptor(simpleMap);

			expect(result).toEqual(Object.fromEntries([ ...simpleMap ]));
		});
	});

	describe('complex constructs', () => {
		it('complex object', () => {
			const result = JsonInterceptor(complexObject);

			const expectedResult = {
				object: simpleObject,
				array: simpleArray,
				set: [ ...simpleSet ],
				map: Object.fromEntries([ ...simpleMap ]),
			};

			expect(result).toEqual(expectedResult);
		});

		it('complex array', () => {
			const result = JsonInterceptor(complexArray);

			const expectedResult = [ simpleObject, simpleArray, [ ...simpleSet ], Object.fromEntries([ ...simpleMap ]) ];

			expect(result).toEqual(expectedResult);
		});

		it('complex set', () => {
			const result = JsonInterceptor(complexSet);

			const expectedResult = [ simpleObject, simpleArray, [ ...simpleSet ], Object.fromEntries([ ...simpleMap ]) ];

			expect(result).toEqual(expectedResult);
		});

		it('complex map', () => {
			const result = JsonInterceptor(complexMap);

			const expectedResult = { };

			expect(result).toEqual(expectedResult);
		});
	});
});
