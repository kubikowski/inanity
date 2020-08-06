import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from '../models/navigation-config.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'sidebar-button',
	templateUrl: './sidebar-button.component.html',
	styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent implements OnInit {

	@Input('config')
	config: NavigationConfig;

	@Input()
	sidenav: MatSidenav;

	constructor() {
	}

	ngOnInit(): void {
	}

	toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.sidenav.toggle();
	}
}
