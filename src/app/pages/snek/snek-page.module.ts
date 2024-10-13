import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnekPageComponent } from 'src/app/pages/snek/snek-page.component';

const routes: Routes = [ {
	path: '',
	component: SnekPageComponent,
	data: { title: 'snek' },
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class SnekPageModule { }
