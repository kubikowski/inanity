import { Component } from '@angular/core';
import { NavigationConfig } from './models/navigation-config.model';
import { SvgIcon } from '../../shared/svg/svg-icon.enum';
import { NavigationService } from '../navigation.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	public readonly navigationConfigs: NavigationConfig[];

	constructor(
		private navigationService: NavigationService,
	) {
		this.navigationConfigs = [
			NavigationConfig.from('About', SvgIcon.WHEEL, 'about'),
			NavigationConfig.from('Gong', SvgIcon.GONG, 'gong'),
			NavigationConfig.from('404', SvgIcon.ONI, 'get-got'),
		];
	}

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
