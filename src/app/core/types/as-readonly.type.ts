import { Mutable } from 'src/app/core/types/mutable.type';

export type AsReadonly<Original, Type> =
	Original extends Mutable<Original>
		? Type
		: Readonly<Type>;
