import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

export function coerceBooleanInput(value: BooleanInput): boolean {
	return coerceBooleanProperty(value);
}
