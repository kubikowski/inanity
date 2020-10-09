import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/about',
		pathMatch: 'full'
	}, {
		path: 'about',
		loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
	}, {
		path: 'gong',
		loadChildren: () => import('./pages/gong/gong.module').then(m => m.GongModule),
	}, {
		path: '**',
		component: PageNotFoundComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {
}
