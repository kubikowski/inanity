import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from 'src/app/pages/about/about-page.component';

const routes: Routes = [ {
	path: '',
	component: AboutPageComponent,
	data: {
		title: 'about',
	},
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class AboutPageModule { }
