import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GongComponent } from './pages/gong/gong.component';

const routes: Routes = [{
		path: '',
		redirectTo: '/gong',
		pathMatch: 'full'
	}, {
		path: 'gong',
		component: GongComponent,
	// }, {
	// 	path: '**',
	// 	component: PageNotFoundComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
