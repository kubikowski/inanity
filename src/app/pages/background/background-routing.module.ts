import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundNoiseComponent } from 'src/app/pages/background/background-noise.component';

const routes: Routes = [
	{
		path: '',
		component: BackgroundNoiseComponent,
		data: {
			title: 'noise',
		},
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class BackgroundRoutingModule { }
