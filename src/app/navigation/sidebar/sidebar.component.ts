import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from './models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';
import { SvgIcon } from '../../shared/svg/svg-icon.enum';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input() sidenav: MatSidenav;

	navigationConfigs: NavigationConfig[];

	constructor() {
	}

	ngOnInit(): void {
		this.navigationConfigs = [
			NavigationConfig.from('About', SvgIcon.WHEEL, 'about'),
			NavigationConfig.from('Gong', SvgIcon.GONG, 'gong'),
			NavigationConfig.from('404', SvgIcon.ONI, 'get-got'),
		];
	}

	toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.sidenav.toggle();
	}
}
