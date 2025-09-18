import { ValueProvider } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

export const matTooltipProvider: ValueProvider = {
	provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
	useValue: {
		disableTooltipInteractivity: true,
		showDelay: 500,
	},
};
