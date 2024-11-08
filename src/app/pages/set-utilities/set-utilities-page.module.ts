import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetUtilitiesPageComponent } from 'src/app/pages/set-utilities/set-utilities-page.component';

const routes: Routes = [ {
	path: '',
	component: SetUtilitiesPageComponent,
	data: {
		title: 'set-utilities',
	},
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class SetUtilitiesPageModule { }
