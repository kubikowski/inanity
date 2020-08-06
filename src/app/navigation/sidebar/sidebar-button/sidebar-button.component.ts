import { Component, Input, OnInit } from '@angular/core';
import { NavigationConfig } from '../models/navigation-config.model';

@Component({
	selector: 'app-sidebar-button',
	templateUrl: './sidebar-button.component.html',
	styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent implements OnInit {

	@Input('config')
	config: NavigationConfig;

	constructor() {
	}

	ngOnInit(): void {
	}

}
