export function xor(a: boolean, b: boolean): boolean {
	return Boolean((a ? 1 : 0) ^ (b ? 1 : 0));
}
