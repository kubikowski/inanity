import { Routes } from '@angular/router';
import { NotFoundPageComponent } from 'src/app/pages/not-found/not-found-page.component';

export const notFoundPageRoute: Routes = [ {
	path: '',
	component: NotFoundPageComponent,
	data: {
		title: 'got lost?',
		description: 'This is not the page you are looking for',
	},
} ];
