import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprinterPageComponent } from './sprinter-page.component';

const routes: Routes = [ {
	path: '',
	component: SprinterPageComponent,
	data: {
		featureFlag: true,
		title: 'sprinter',
	},
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class SprinterPageModule { }
