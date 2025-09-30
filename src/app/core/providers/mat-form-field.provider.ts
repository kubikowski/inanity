import { ValueProvider } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const matFormFieldProvider: ValueProvider = {
	provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
	useValue: {
		appearance: 'outline',
		hideRequiredMarker: true,
		subscriptSizing: 'fixed',
	},
};
