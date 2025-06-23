import { ValueProvider } from '@angular/core';
import { matCardProvider } from 'src/app/core/providers/mat-card.provider';
import { matIconProvider } from 'src/app/core/providers/mat-icon.provider';
import { matTooltipProvider } from 'src/app/core/providers/mat-tooltip.provider';

export function provideMaterialConfiguration(): ValueProvider[] {
	return [
		matCardProvider,
		matIconProvider,
		matTooltipProvider,
	] as const;
}
