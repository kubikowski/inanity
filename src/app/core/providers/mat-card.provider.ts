import { ValueProvider } from '@angular/core';
import { MAT_CARD_CONFIG } from '@angular/material/card';

export const matCardProvider: ValueProvider = {
	provide: MAT_CARD_CONFIG,
	useValue: {
		appearance: 'outlined',
	},
};
