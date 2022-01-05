import { CircularArray } from 'src/app/core/data-structures/circular-array/circular-array.proxy';
import { TenTrit, Trit } from 'src/app/features/malbolge/models/data-structures/ternary.model';

const CrazyLookup = [
	[ 1 as Trit, 0 as Trit, 0 as Trit ],
	[ 1 as Trit, 0 as Trit, 2 as Trit ],
	[ 2 as Trit, 2 as Trit, 1 as Trit ],
] as const;

export function crazy(trit1: Trit, trit2: Trit): Trit {
	return CrazyLookup[trit1][trit2];
}

export function tenCrazy(tentrit1: TenTrit, tentrit2: TenTrit): TenTrit {
	const tentrit = TenTrit.default();

	for (let i = 0; i < 10; i++) {
		tentrit[i] = crazy(tentrit1[i], tentrit2[i]);
	}

	return tentrit;
}

export function getCrazyLoop(tentrit1: TenTrit, tentrit2: TenTrit): Array<TenTrit> {
	const first = tenCrazy(tentrit1, tentrit2);
	const second = tenCrazy(tentrit2, first);

	const loop = CircularArray(Array.from({ 0: first, 1: second, length: 12 }));

	for (let index = 2; index < loop.length; index++) {
		loop[index] = tenCrazy(loop[index - 2], loop[index - 1]);
	}

	return loop;
}
