import { Routes } from '@angular/router';
import { GongPageComponent } from 'src/app/pages/gong/gong-page.component';

export const gongPageRoute: Routes = [ {
	path: '',
	component: GongPageComponent,
	// canActivate: [ FeatureFlagGuard.canActivate() ],
	data: {
		featureFlag: true,
		title: 'gong',
	},
} ];
