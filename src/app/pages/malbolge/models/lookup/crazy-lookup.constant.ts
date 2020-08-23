import { Trit, TenTrit } from '../data-structures/ternary.model';
import { NegativeIndexArrayHandler } from '../data-structures/negative-index-array.proxy';

const CrazyLookup: ReadonlyArray<ReadonlyArray<Trit>> = [
	[ 1, 0, 0 ],
	[ 1, 0, 2 ],
	[ 2, 2, 1 ]
];

export function crazy(trit1: Trit, trit2: Trit): Trit {
	return CrazyLookup[trit1][trit2];
}

export function tenCrazy(tenTrit1: TenTrit, tenTrit2: TenTrit): TenTrit {
	const tenTrit = TenTrit.create();
	for (let i = 0; i < 10; i++) {
		tenTrit[i] = crazy(tenTrit1[i], tenTrit2[i]);
	}
	return tenTrit;
}

export function getCrazyLoop(tentrit1: TenTrit, tentrit2: TenTrit): Array<TenTrit> {
	const loop = new Proxy([tentrit1, tentrit2], NegativeIndexArrayHandler);
	let next = tenCrazy(loop[loop.length - 2], loop[loop.length - 1]);
	while (!next.equals(tentrit1)) {
		loop.push(next);
		next = tenCrazy(loop[loop.length - 2], loop[loop.length - 1]);
	}
	return loop;
}
