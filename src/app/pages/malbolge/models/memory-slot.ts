import { TenTrit } from './ternary.model';

export class MemorySlot {

	public tenTritValue: TenTrit;

	public constructor(
		public value: number = 0,
	) {
		this.tenTritValue = TenTrit.fromValue(value);
	}

	public setValue(value: number): void {
		this.value = value;
		this.tenTritValue.value = value;
	}
}
