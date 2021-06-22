import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/gong',
		pathMatch: 'full'
	}, {
		path: 'gong',
		loadChildren: () => import('./pages/gong/gong.module').then(m => m.GongModule),
	}, {
		path: '**',
		loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {
}
