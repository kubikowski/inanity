import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/gong',
		pathMatch: 'full'
	}, {
		path: 'gong',
		loadChildren: () => import('./pages/gong/gong.module').then(m => m.GongModule),
	}, {
		path: 'malbolge',
		loadChildren: () => import('./pages/malbolge/malbolge.module').then(m => m.MalbolgeModule),
	}, {
		path: '**',
		component: PageNotFoundComponent,
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {
}
