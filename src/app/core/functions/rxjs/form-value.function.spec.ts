import { FormControl, Validators } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { formValue } from './form-value.function';

describe('formValue', () => {

	let control: FormControl<string | null>;
	let value$: Observable<string | null>;

	beforeEach(() => {
		control = new FormControl<string | null>(null, Validators.required);

		value$ = formValue(control);
	});

	it('should return the correct initial value', async () => {
		const value = await firstValueFrom(value$);

		expect(value).toBeNull();
	});

	it('should return the correct value when subscribing after the form\'s value has been modified', async () => {
		const validValue = 'a valid value';
		control.setValue(validValue);

		const value = await firstValueFrom(value$);

		expect(value).toEqual(validValue);
	});
});
