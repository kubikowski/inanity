// region Iterable Types
type IterableValue<Type> =
	Type extends ReadonlyArray<infer Value> ? Value
		: Type extends ReadonlySet<infer Value> ? Value
			: never;

type ArrayType<Type> = ReadonlyArray<IterableValue<Type>>;
type SetType<Type> = ReadonlySet<IterableValue<Type>>;
type Iterable<Type> = ArrayType<Type> | SetType<Type>;

type InterceptArrayType<Type> = Array<InterceptReturnType<IterableValue<Type>>>;
// endregion Iterable Types

// region Map Types
type MapKey<Type> = Type extends ReadonlyMap<infer Key, unknown> ? Key : never;
type MapValue<Type> = Type extends ReadonlyMap<unknown, infer Value> ? Value : never;
type MapType<Type> = ReadonlyMap<MapKey<Type>, MapValue<Type>>;

type MapConversionKey<Type> = MapKey<Type> extends string | number ? MapKey<Type> : never;
type MapConversionValue<Type> = MapKey<Type> extends string | number ? MapValue<Type> : never;

type InterceptMapType<Type> = Record<MapConversionKey<Type>, InterceptReturnType<MapConversionValue<Type>>>;
// endregion Map Types

// region Object Types
type ObjectKey<Type> = Type extends Record<infer Key, unknown> ? Key : never;
type ObjectValue<Type> = Type extends Record<string | number | symbol, infer Value> ? Value : never;
type ObjectType<Type> = Record<ObjectKey<Type>, ObjectValue<Type>>;

type InterceptObjectType<Type> = Record<ObjectKey<Type>, InterceptReturnType<ObjectValue<Type>>>;
// endregion Object Types

type InterceptReturnType<Type> =
	Type extends Iterable<Type> ? InterceptArrayType<Type>
		: Type extends MapType<Type> ? InterceptMapType<Type>
			: Type extends ObjectType<Type> ? InterceptObjectType<Type>
				: Type;

/**
 * Intercepts a requestBody to correctly serialize Sets and Maps
 *
 * ES Sets and Maps do not serialize to JSON correctly and there is
 * no long term plan in ES to support their correct serialization.
 *
 * Maps and, _because Sets are implemented as Maps_, Sets are not currently defined
 * to support native JSON serialization. Unlike ES Objects, which are limited in key types
 * string, number, and Symbol, Maps can have any types of keys, including Object.
 *
 * And you cannot serialize an Object as an Object key in JSON.
 *
 * So the default behavior is that all Sets serialize as [].
 * And all maps serialize as {}.
 *
 * This method intercepts before serialization so that Sets serialize as Arrays.
 * And Maps serialize as Objects, as long as their keys are numbers or strings.
 *
 * @param requestBody a valid request body, or null if there is none provided.
 */
export function intercept<Type extends unknown>(requestBody: Type): InterceptReturnType<Type> {
	if (isIterable(requestBody)) {
		return interceptIterable(requestBody) as InterceptReturnType<Type>;
	}

	if (isMap(requestBody)) {
		return interceptMap(requestBody) as InterceptReturnType<Type>;
	}

	if (isObject(requestBody)) {
		return interceptObject(requestBody) as InterceptReturnType<Type>;
	}

	return requestBody as InterceptReturnType<Type>;
}

// region Iterables
function isIterable<Type extends unknown>(requestBody: Type): requestBody is Type & Iterable<Type> {
	return requestBody instanceof Array
		|| requestBody instanceof Set;
}

function interceptIterable<Type extends unknown>(requestBody: Iterable<Type>): InterceptArrayType<Type> {
	const requestBodyClone = <InterceptArrayType<Type>>[];

	requestBody.forEach(value => {
		requestBodyClone.push(intercept(value));
	});

	return requestBodyClone;
}
// endregion Iterables

// region Maps
function isMap<Type extends unknown>(requestBody: Type): requestBody is Type & MapType<Type> {
	return requestBody instanceof Map;
}

// Todo: MapKey needs to include Map key types that are unsupported on Record
//  And if so, return Record<never, never>
function interceptMap<Type extends unknown>(requestBody: MapType<Type>): InterceptMapType<Type> {
	const requestBodyClone = <InterceptMapType<Type>>{};

	requestBody.forEach((value, key) => {
		if (isValidMapKey(key)) {
			requestBodyClone[key] = intercept(value as MapConversionValue<Type>);
		}
	});

	return requestBodyClone;
}

function isValidMapKey<Type extends unknown>(key: MapKey<Type>): key is MapConversionKey<Type> {
	switch (typeof key) {
		case 'number':
		case 'string':
			return true;
		default:
			return false;
	}
}
// endregion Maps

// region Objects
function isObject<Type extends unknown>(requestBody: Type): requestBody is Type & ObjectType<Type> {
	return requestBody instanceof Object;
}

function interceptObject<Type extends unknown>(requestBody: ObjectType<Type>): InterceptObjectType<Type> {
	const entries = Object.entries(requestBody) as [ ObjectKey<Type>, ObjectValue<Type> ][];

	if (entries.length > 0) {
		const requestBodyClone = <InterceptObjectType<Type>>{};

		entries.forEach(([ key, value ]) => {
			requestBodyClone[key] = intercept(value);
		});

		return requestBodyClone;
	} else {
		return requestBody as InterceptObjectType<Type>;
	}
}
// endregion Objects
