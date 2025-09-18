import { Routes } from '@angular/router';
import { SprinterPageComponent } from './sprinter-page.component';

export const sprinterPageRoute: Routes = [ {
	path: '',
	component: SprinterPageComponent,
	data: {
		featureFlag: true,
		title: 'sprinter',
		description: 'The Sprinter',
	},
} ];
