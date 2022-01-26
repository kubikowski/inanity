namespace Prune {
	/**
	 * Additional Prune Options
	 *
	 * * `pruneNulls` - <i>(default false)</i> will remove fields of value `null`.
	 * * `pruneEmptyArrays` - <i>(default false)</i> will remove fields of value empty `Array`.
	 * * `pruneEmptyStrings` - <i>(default false)</i> will remove fields of value empty `String` or only white space.
	 */
	interface PruneOptions {
		pruneNulls?: boolean;
		pruneEmptyArrays?: boolean;
		pruneEmptyStrings?: boolean;
	}

	/**
	 * Removes `undefined` fields from input object.
	 *
	 * Optionally, remove `null` fields, empty `Arrays`, or empty `Strings`
	 *
	 * @param object any js object
	 * @param options optional types to prune from an object.
	 * @param options.pruneNulls <i>(default false)</i> will remove fields of value `null`.
	 * @param options.pruneEmptyArrays <i>(default false)</i> will remove fields of value empty `Array`.
	 * @param options.pruneEmptyStrings <i>(default false)</i> will remove fields of value empty `String` or only white space.
	 */
	export function prune(object: Record<string, unknown>, options: PruneOptions = {}): Record<string, unknown> {
		const prunedObject: Record<string, unknown> = {};

		Object.entries(object).forEach(([ key, value ]) => {
			const shouldPruneValue = shouldPruneUndefined(value)
				|| shouldPruneNull(value, options)
				|| shouldPruneEmptyArray(value, options)
				|| shouldPruneEmptyString(value, options);

			if (!shouldPruneValue) {
				prunedObject[key] = value;
			}
		});

		return prunedObject;
	}

	function shouldPruneUndefined(value: unknown): boolean {
		return typeof value === "undefined";
	}

	function shouldPruneNull(value: unknown, { pruneNulls }: PruneOptions): boolean {
		return !!pruneNulls
			&& value === null;
	}

	function shouldPruneEmptyArray(value: unknown, { pruneEmptyArrays }: PruneOptions): boolean {
		return !!pruneEmptyArrays
			&& Array.isArray(value)
			&& value.length === 0;
	}

	function shouldPruneEmptyString(value: unknown, { pruneEmptyStrings }: PruneOptions): boolean {
		return !!pruneEmptyStrings
			&& typeof value === 'string'
			&& value.trim() === '';
	}
}

import prune = Prune.prune;
export { prune };
