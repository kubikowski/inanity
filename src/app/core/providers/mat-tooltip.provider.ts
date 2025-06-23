import { ValueProvider } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';

export const matTooltipProvider: ValueProvider = {
	provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
	useValue: {
		...MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(),
		disableTooltipInteractivity: true,
		showDelay: 300,
	},
};
