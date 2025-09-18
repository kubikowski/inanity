import { Routes } from '@angular/router';
import { SnekPageComponent } from 'src/app/pages/snek/snek-page.component';

export const snekPageRoute: Routes = [ {
	path: '',
	component: SnekPageComponent,
	data: {
		title: 'snek',
		description: 'Play the danger noodle game',
	},
} ];
