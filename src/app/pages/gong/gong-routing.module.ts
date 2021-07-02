import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GongComponent } from 'src/app/pages/gong/gong.component';

const routes: Routes = [
	{
		path: '',
		component: GongComponent,
		data: {
			title: 'gong',
		},
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class GongRoutingModule { }
