import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MalbolgeComponent } from 'src/app/pages/malbolge/malbolge.component';

const routes: Routes = [
	{
		path: '',
		component: MalbolgeComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class MalbolgeRoutingModule {
}
