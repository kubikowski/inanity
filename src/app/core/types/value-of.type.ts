/**
 * Think keyof, but for the object's values' types
 * @desc Get the union type of all the values in an object type `T`
 */
export type ValueOf<T> = T[keyof T];
