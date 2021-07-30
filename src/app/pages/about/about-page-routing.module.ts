import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from 'src/app/pages/about/about-page.component';

const routes: Routes = [
	{
		path: '',
		component: AboutPageComponent,
		data: {
			title: 'about me',
		},
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class AboutPageRoutingModule { }
