import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { NavigationConfig } from 'src/app/navigation/sidebar/models/navigation-config.model';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: [ './sidebar-item.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
