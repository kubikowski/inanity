export type Tuple<Type, Length, RecursiveTuple extends Type[] = []> = RecursiveTuple[ 'length' ] extends Length
	? RecursiveTuple
	: Tuple<Type, Length, [ ...RecursiveTuple, Type ]>;
