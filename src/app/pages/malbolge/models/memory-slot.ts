import { Trit, TenTrit, MaxTenTrit } from './ternary.model';

export class MemorySlot {

	public tenTritValue: TenTrit;

	public constructor(
		public value: number = 0,
	) {
		this.tenTritValue = this.getTenTritFromValue(value);
	}

	public setValue(value: number): void {
		this.value = value;
		this.tenTritValue = this.getTenTritFromValue(value);
	}

	private getTenTritFromValue(value: number): TenTrit {
		const tenTrit = Array(10) as TenTrit;

		let maxTrit = MaxTenTrit;
		for (let i = 0; i < 10; i++) {
			maxTrit = Math.floor(maxTrit / 3);
			if (value >= maxTrit) {
				tenTrit[i] = value % 3 as Trit;
				value = Math.floor(value / 3);
			}
		}

		return tenTrit;
	}

	private getValueFromTenTrit(tenTrit: TenTrit): number {
		let value = 0;

		for (let i = 0; i < 10; i++) {
			value = value + (tenTrit[i] * Math.pow(3, 9 - i));
		}

		return value;
	}
}
