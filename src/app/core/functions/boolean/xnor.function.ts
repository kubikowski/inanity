import { xor } from 'src/app/core/functions/boolean/xor.function';

export function xnor(a: boolean, b: boolean): boolean {
	return !xor(a, b);
}
