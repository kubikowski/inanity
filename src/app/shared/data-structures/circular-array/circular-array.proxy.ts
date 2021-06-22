import { mod } from 'src/app/shared/functions/mod/mod.function';

export function ReadonlyCircularArray<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
	return new Proxy(array, {
		has,
		get,
	});
}

export function CircularArray<T>(array: Array<T>): Array<T> {
	return new Proxy(array, {
		has,
		get,
		set,
	});
}

function has<T>(target: Array<T> | ReadonlyArray<T>, property: PropertyKey): boolean {
	return Reflect.has(target, property);
}

function get<T>(target: Array<T> | ReadonlyArray<T>, property: PropertyKey): T {
	if (property === Symbol.iterator) {
		return target[Symbol.iterator].bind(target);
	} else {
		return Reflect.get(target, getCircularPropertyKey(target, property));
	}
}

function set<T>(target: Array<T>, property: PropertyKey, value: any): boolean {
	if (property === Symbol.iterator) {
		return (target[Symbol.iterator] = value).bind(target);
	} else {
		return Reflect.set(target, getCircularPropertyKey(target, property), value);
	}
}

function getCircularPropertyKey<T>(target: Array<T> | ReadonlyArray<T>, property: PropertyKey): PropertyKey {
	return (typeof property === 'string' && !isNaN(+property))
		? mod(+property, target.length)
		: property;
}
