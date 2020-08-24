import { TenTrit, trit } from '../data-structures/ternary.model';
import { ArrayProxy } from '../data-structures/negative-index-array.proxy';

const CrazyLookup: ReadonlyArray<ReadonlyArray<trit>> = [
	[ 1, 0, 0 ],
	[ 1, 0, 2 ],
	[ 2, 2, 1 ]
];

export function crazy(trit1: trit, trit2: trit): trit {
	return CrazyLookup[trit1][trit2];
}

export function tenCrazy(tentrit1: TenTrit, tentrit2: TenTrit): TenTrit {
	const tentrit = TenTrit.create();
	for (let i = 0; i < 10; i++) {
		tentrit[i] = crazy(tentrit1[i], tentrit2[i]);
	}
	return tentrit;
}

export function getCrazyLoop(tentrit1: TenTrit, tentrit2: TenTrit): Array<TenTrit> {
	const loop = ArrayProxy([tentrit1, tentrit2]);
	let next = tenCrazy(loop[loop.length - 2], loop[loop.length - 1]);
	while (!next.equals(tentrit1)) {
		loop.push(next);
		next = tenCrazy(loop[loop.length - 2], loop[loop.length - 1]);
	}
	return loop;
}
