import { Routes } from '@angular/router';
import { SetUtilitiesPageComponent } from 'src/app/pages/set-utilities/set-utilities-page.component';

export const setUtilitiesPageRoute: Routes = [ {
	path: '',
	component: SetUtilitiesPageComponent,
	data: {
		title: 'set-utilities',
		description: 'The set-utilities package',
	},
} ];
