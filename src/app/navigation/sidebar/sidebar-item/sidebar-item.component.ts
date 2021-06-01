import { Component, Input } from '@angular/core';
import { NavigationConfig } from '../models/navigation-config.model';
import { NavigationService } from '../../navigation.service';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
	@Input() config: NavigationConfig;

	constructor(private navigationService: NavigationService) {
	}

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
