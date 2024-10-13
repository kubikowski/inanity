import { Routes } from '@angular/router';
import { FeatureFlagGuard } from 'src/app/core/routing/feature-flag.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/snek',
		pathMatch: 'full',
	}, {
		path: '',
		canActivateChild: [ FeatureFlagGuard ],
		children: [
			{
				path: 'about',
				loadChildren: () => import('src/app/pages/about/about-page.module')
					.then(module => module.AboutPageModule),
			}, {
				path: 'background',
				loadChildren: () => import('src/app/pages/background/background-page.module')
					.then(module => module.BackgroundPageModule),
			}, {
				path: 'gong',
				loadChildren: () => import('src/app/pages/gong/gong-page.module')
					.then(module => module.GongPageModule),
			}, {
				path: 'snek',
				loadChildren: () => import('src/app/pages/snek/snek-page.module')
					.then(module => module.SnekPageModule),
			}, {
				path: '**',
				loadChildren: () => import('src/app/pages/not-found/not-found-page.module')
					.then(module => module.NotFoundPageModule),
			},
		],
	},
];
