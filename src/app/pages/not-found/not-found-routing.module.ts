import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: NotFoundComponent,
		data: {
			title: 'got lost?',
		},
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class NotFoundRoutingModule {
}
