import { Routes } from '@angular/router';
import { AboutPageComponent } from 'src/app/pages/about/about-page.component';

export const aboutPageRoute: Routes = [ {
	path: '',
	component: AboutPageComponent,
	data: {
		title: 'about',
		description: 'About the author',
	},
} ];
