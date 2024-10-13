import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundPageComponent } from 'src/app/pages/background/background-page.component';

const routes: Routes = [ {
	path: '',
	component: BackgroundPageComponent,
	data: { title: 'noise' },
} ];

@NgModule({ imports: [ RouterModule.forChild(routes) ] })
export class BackgroundPageModule { }
