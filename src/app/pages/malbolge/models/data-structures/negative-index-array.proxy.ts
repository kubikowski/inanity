
export function ReadonlyArrayProxy<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
	return new Proxy(array, {
		has(target: T[], property: PropertyKey): boolean {
			return Reflect.has(target, property);
		},
		get(target: T[], property: PropertyKey): T {
			property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
			return Reflect.get(target, property);
		},
	});
}

export function ArrayProxy<T>(array: Array<T>): Array<T> {
	return new Proxy(array, {
		has(target: T[], property: PropertyKey): boolean {
			return Reflect.has(target, property);
		},
		get(target: T[], property: PropertyKey): T {
			if (property === Symbol.iterator) {
				return target[Symbol.iterator].bind(target);
			} else {
				property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
				return Reflect.get(target, property);
			}
		},
		set(target: T[], property: PropertyKey, value: any): boolean {
			if (property === Symbol.iterator) {
				return (target[Symbol.iterator] = value).bind(target);
			} else {
				property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
				return Reflect.set(target, property, value);
			}
		},
	});
}
