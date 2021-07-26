import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { startWith } from 'rxjs/operators';

export function Controlled(options?: ControlledDecoratorOptions): (target: any, key: string) => any {
	return (target: any, key: string) =>
		Object.defineProperty(target, key, {
			set(firstValue: any): void {
				const control = new FormControl(
					firstValue,
					options?.validator ?? null,
					options?.asyncValidator ?? null,
				);

				const observable$ = control.valueChanges
					.pipe(startWith(control.value));

				Object.defineProperty(this, key, {
					get: () => control?.value ?? null,
					set: value => control.setValue(value),
					enumerable: true,
				});

				Object.defineProperty(this, key + 'Control', {
					get: () => control,
					enumerable: true,
				});

				Object.defineProperty(this, key + '$', {
					get: () => observable$,
					enumerable: true,
				});
			},
			enumerable: true,
			configurable: true,
		});
}

export interface ControlledDecoratorOptions {
	validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
	asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}
