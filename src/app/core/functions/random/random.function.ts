/**
 * Seeded implementation of the Linear Congruential Generator [LCG]
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
export class Random {

	// LCG using GCC's constants
	private static readonly m = BigInt(0x80000000); // 2**31;
	private static readonly a = BigInt(1103515245);
	private static readonly c = BigInt(12345);

	private constructor(
		// initial state is the random seed
		private state: bigint,
	) { }

	// seeded random, chosen by fair dice roll
	public static seeded(seed = 21): Random {
		return new Random(BigInt(seed));
	}

	// unseeded random, chosen by rigged maths
	public static unseeded(): Random {
		return new Random(BigInt(Math.floor(Math.random() * Number(Random.m))));
	}

	// next 32-bit integer
	public int(): number {
		this.state = (Random.a * this.state + Random.c) % Random.m;
		return Number(this.state);
	}

	// next float from [0,1]
	public float(): number {
		return this.int() / (Number(Random.m) - 1);
	}

	// next boolean
	public bool(threshold = 0.5): boolean {
		return this.float() > threshold;
	}

	// uniform distribution
	public uniform(max: number, min = 0): number {
		return Math.floor(this.float() * (max - min) + min);
	}

	// Box-Muller normal distribution
	public normal(min: number, max: number, skew = 1): number {
		const u = this.float();
		const v = this.float();

		const r = Math.sqrt(-2.0 * Math.log(u));
		const theta = 2.0 * Math.PI * v;
		const percentile = (r * Math.cos(theta)) / 10.0 + 0.5;

		if (percentile < 0 || percentile > 1) {
			return this.normal(min, max);
		}

		const skewed = (skew !== 1)
			? Math.pow(percentile, skew)
			: percentile;

		return Math.floor(skewed * (max - min) + min);
	}
}
