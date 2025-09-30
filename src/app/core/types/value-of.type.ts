/**
 * Think `keyof`, but for the object's values' types
 * @desc
 * Gets the union type of all the values in an object type `Type`.
 * Notably, it is often necessary to preface the `Type` argument with `typeof`.
 */
export type ValueOf<Type> = Type[ keyof Type ];
