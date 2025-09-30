import { AbstractControl, FormControlStatus } from '@angular/forms';
import { concat, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Observable of the current status of a form,
 * and the statusChanges.
 *
 * @example
 * formStatus(this.myFormGroup)
 */
export function formStatus<T>(formElement: AbstractControl<T>): Observable<FormControlStatus> {
	return concat(
		of(null).pipe(map(() => formElement.status)),
		formElement.statusChanges,
	);
}
