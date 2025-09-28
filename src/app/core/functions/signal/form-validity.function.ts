import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { formStatus } from 'src/app/core/functions/rxjs/form-status.function';

export function formValidity<T>(formElement: AbstractControl<T>): Signal<boolean> {
	return toSignal(formStatus(formElement).pipe(map(status => status === 'VALID'))) as Signal<boolean>;
}
