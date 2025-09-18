import { Routes } from '@angular/router';
import { GongPageComponent } from 'src/app/pages/gong/gong-page.component';

export const gongPageRoute: Routes = [ {
	path: '',
	component: GongPageComponent,
	data: {
		featureFlag: true,
		title: 'gong',
		description: 'The Gong',
	},
} ];
