import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from '../models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

	@Input() config: NavigationConfig;
	@Input() sidenav: MatSidenav;

	constructor() {
	}

	ngOnInit(): void {
	}

	toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.sidenav.toggle();
	}
}
