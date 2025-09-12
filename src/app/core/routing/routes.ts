import { Routes } from '@angular/router';
import { FeatureFlagGuard } from 'src/app/core/routing/feature-flag.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/snek',
		pathMatch: 'full',
	}, {
		path: '',
		canActivateChild: [ FeatureFlagGuard.canActivateChild() ],
		children: [
			{
				path: 'about',
				loadChildren: () => import('src/app/pages/about/about-page.route')
					.then(module => module.aboutPageRoute),
			}, {
				path: 'background',
				loadChildren: () => import('src/app/pages/background/background-page.route')
					.then(module => module.backgroundPageRoute),
			}, {
				path: 'gong',
				loadChildren: () => import('src/app/pages/gong/gong-page.route')
					.then(module => module.gongPageRoute),
			}, {
				path: 'set-utilities',
				loadChildren: () => import('src/app/pages/set-utilities/set-utilities-page.route')
					.then(module => module.setUtilitiesPageRoute),
			}, {
				path: 'sprinter',
				loadChildren: () => import('src/app/pages/sprinter/sprinter-page.route')
					.then(module => module.sprinterPageRoute),
			}, {
				path: 'snek',
				loadChildren: () => import('src/app/pages/snek/snek-page.route')
					.then(module => module.snekPageRoute),
			}, {
				path: '**',
				loadChildren: () => import('src/app/pages/not-found/not-found-page.route')
					.then(module => module.notFoundPageRoute),
			},
		],
	},
];
