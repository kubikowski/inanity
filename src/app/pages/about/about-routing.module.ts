import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GongComponent } from '../gong/gong.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
	{
		path: '',
		component: AboutComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AboutRoutingModule {
}
