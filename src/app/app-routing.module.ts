import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/gong',
		pathMatch: 'full'
	}, {
		path: 'background',
		loadChildren: () => import('src/app/pages/background/background.module')
			.then(module => module.BackgroundModule),
	}, {
		path: 'gong',
		loadChildren: () => import('src/app/pages/gong/gong.module')
			.then(module => module.GongModule),
	}, {
		path: '**',
		loadChildren: () => import('src/app/pages/not-found/not-found.module')
			.then(module => module.NotFoundModule),
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule { }
