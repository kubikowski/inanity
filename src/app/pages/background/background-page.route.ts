import { Routes } from '@angular/router';
import { BackgroundPageComponent } from 'src/app/pages/background/background-page.component';

export const backgroundPageRoute: Routes = [ {
	path: '',
	component: BackgroundPageComponent,
	data: { title: 'noise' },
} ];
