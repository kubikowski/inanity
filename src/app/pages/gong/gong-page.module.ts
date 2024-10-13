import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GongPageComponent } from 'src/app/pages/gong/gong-page.component';

const routes: Routes = [ {
	path: '',
	component: GongPageComponent,
	data: {
		featureFlag: true,
		title: 'gong',
	},
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class GongPageModule { }
