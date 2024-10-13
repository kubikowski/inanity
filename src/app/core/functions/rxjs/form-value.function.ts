import { AbstractControl, FormControlState } from '@angular/forms';
import { concat, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `value` of an AbstractControl<T> is
 * typed as `T | FormControlState<T>`.
 *
 * This type excludes the `FormControlState<T>` option,
 * such that only the value's type is returned.
 */
type Value<T> = Exclude<T, FormControlState<T>>;

/**
 * Observable of the current value of a form,
 * and the valueChanges.
 *
 * @example
 * myStringControl = new FormControl('');
 * myString$ = formValue(myStringControl);
 */
export function formValue<T>(formElement: AbstractControl<T>): Observable<Value<T>> {
	return concat(
		of(null).pipe(map(() => formElement.value as Value<T>)),
		formElement.valueChanges as Observable<Value<T>>,
	);
}
