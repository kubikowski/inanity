import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from 'src/app/pages/not-found/not-found-page.component';

const routes: Routes = [ {
	path: '',
	component: NotFoundPageComponent,
	data: { title: 'got lost?' },
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class NotFoundPageModule { }
