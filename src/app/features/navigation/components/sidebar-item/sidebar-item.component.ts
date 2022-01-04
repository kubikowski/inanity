import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationConfig } from 'src/app/features/navigation/models/navigation-config.model';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: [ './sidebar-item.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
	@Input() public config: NavigationConfig;

	public constructor(
		private readonly navigationService: NavigationService,
	) { }

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
