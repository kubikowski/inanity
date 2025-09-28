import { FormControl, FormControlStatus, Validators } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { formStatus } from './form-status.function';

describe('formStatus', () => {

	let control: FormControl<string | null>;
	let status$: Observable<FormControlStatus>;

	beforeEach(() => {
		control = new FormControl<string | null>(null, _control => Validators.required(_control));
		status$ = formStatus(control);
	});

	it('should return the correct initial status', async () => {
		const status = await firstValueFrom(status$);

		expect(status).toEqual('INVALID');
	});

	it('should return the correct status when subscribing after the form\'s status has been modified', async () => {
		control.setValue('a valid value');

		const status = await firstValueFrom(status$);

		expect(status).toEqual('VALID');
	});
});
