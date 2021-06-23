import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { NavigationConfig } from 'src/app/navigation/sidebar/models/navigation-config.model';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	public readonly navigationConfigs: ReadonlyArray<NavigationConfig>;

	constructor(
		private navigationService: NavigationService,
	) {
		this.navigationConfigs = SidebarComponent.navigationItems;
	}

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}

	private static get navigationItems(): ReadonlyArray<NavigationConfig> {
		return [
			NavigationConfig.from('About', SvgIcon.GOAT, 'about'),
			NavigationConfig.from('Gong', SvgIcon.GONG, 'gong'),
			NavigationConfig.from('404', SvgIcon.ONI, 'get-got'),
		];
	}
}
