import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from './models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';
import { SVGIcon } from '../../shared/svg/models/svgicon.model';

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
			NavigationConfig.from('About', SVGIcon.Wheel, 'about'),
			NavigationConfig.from('Gong',  SVGIcon.Gong, 'gong'),
			NavigationConfig.from('404', SVGIcon.Wheel, 'get-got'),
		];
	}

}
