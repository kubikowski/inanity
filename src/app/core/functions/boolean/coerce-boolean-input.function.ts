import { coerceBooleanProperty } from '@angular/cdk/coercion';

type BooleanInput = boolean | '';

export function coerceBooleanInput(value: BooleanInput): boolean {
	return coerceBooleanProperty(value);
}
