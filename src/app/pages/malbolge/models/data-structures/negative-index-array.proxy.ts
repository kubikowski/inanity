export const NegativeIndexReadonlyArrayHandler = {
	has(target: any[], property: PropertyKey): boolean {
		return Reflect.has(target, property);
	},
	get(target: any[], property: PropertyKey): any {
		property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
		return Reflect.get(target, property);
	},
};

export const NegativeIndexArrayHandler = {
	has(target: any[], property: PropertyKey): boolean {
		return Reflect.has(target, property);
	},
	get(target: any[], property: PropertyKey): any {
		if (property === Symbol.iterator) {
			return target[Symbol.iterator].bind(target);
		} else {
			property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
			return Reflect.get(target, property);
		}
	},
	set(target: any[], property: PropertyKey, value: any): boolean {
		if (property === Symbol.iterator) {
			return (target[Symbol.iterator] = value).bind(target);
		} else {
			property = (typeof property === 'string' && +property < 0) ? +property + target.length : property;
			return Reflect.set(target, property, value);
		}
	},
};
