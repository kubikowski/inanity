import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from './models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';
import { WheelIcon, GongIcon, OniIcon } from '../../shared/svg/svg-icons.constant';

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
			NavigationConfig.from('About', WheelIcon, 'about'),
			NavigationConfig.from('Gong', GongIcon, 'gong'),
			NavigationConfig.from('Malbolge', OniIcon, 'malbolge'),
		];
	}

}
