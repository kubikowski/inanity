import { mod } from 'src/app/shared/functions/mod/mod.function';

export function ReadonlyCircularArray<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
	return new Proxy(array, {
		has(target: T[], property: PropertyKey): boolean {
			return Reflect.has(target, property);
		},
		get(target: T[], property: PropertyKey): T {
			return Reflect.get(target, getCircularPropertyKey(target, property));
		},
	});
}

export function CircularArray<T>(array: Array<T>): Array<T> {
	return new Proxy(array, {
		has(target: T[], property: PropertyKey): boolean {
			return Reflect.has(target, property);
		},
		get(target: T[], property: PropertyKey): T {
			if (property === Symbol.iterator) {
				return target[Symbol.iterator].bind(target);
			} else {
				return Reflect.get(target, getCircularPropertyKey(target, property));
			}
		},
		set(target: T[], property: PropertyKey, value: any): boolean {
			if (property === Symbol.iterator) {
				return (target[Symbol.iterator] = value).bind(target);
			} else {
				return Reflect.set(target, getPositivePropertyKey(target, property), value);
			}
		},
	});
}

function getCircularPropertyKey<T>(target: T[], property: PropertyKey): PropertyKey {
	return (typeof property === 'string' && !isNaN(+property))
		? mod(+property, target.length)
		: property;
}

function getPositivePropertyKey<T>(target: T[], property: PropertyKey): PropertyKey {
	return (typeof property === 'string' && !isNaN(+property) && +property < 0)
		? mod(+property, target.length)
		: property;
}
