import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from './models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';
import { IconFile } from '../../shared/svg/models/icon-file.enum';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input()
	sidenav: MatSidenav;

	navigationConfigs: NavigationConfig[];

	constructor() {
	}

	ngOnInit(): void {
		this.navigationConfigs = [
			NavigationConfig.from('About', IconFile.WHEEL, 'about'),
			NavigationConfig.from('Gong',  IconFile.GONG, 'gong'),
			NavigationConfig.from('404', IconFile.WHEEL, 'get-got'),
		];
	}

}
