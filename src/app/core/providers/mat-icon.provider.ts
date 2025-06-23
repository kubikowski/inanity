import { ValueProvider } from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';

export const matIconProvider: ValueProvider = {
	provide: MAT_ICON_DEFAULT_OPTIONS,
	useValue: {
		fontSet: 'material-symbols-rounded',
	},
};
