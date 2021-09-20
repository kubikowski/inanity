import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MalbolgePageComponent } from 'src/app/pages/malbolge/malbolge-page.component';

const routes: Routes = [
	{
		path: '',
		component: MalbolgePageComponent,
		data: {
			featureFlag: true,
			title: 'malbolge',
		},
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class MalbolgePageRoutingModule { }
