import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { NavigationConfig } from 'src/app/features/navigation/models/navigation-config.model';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	public readonly navigationConfigs: ReadonlyArray<NavigationConfig>;

	public readonly GitHubIcon = SvgIcon.GITHUB;
	public readonly version = environment.version;

	public constructor(
		private readonly navigationService: NavigationService,
	) {
		this.navigationConfigs = SidebarComponent.navigationItems;
	}

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}

	private static get navigationItems(): ReadonlyArray<NavigationConfig> {
		return [
			NavigationConfig.from('About', SvgIcon.GOAT, '/about'),
			NavigationConfig.from('Snek', SvgIcon.SNAKE, '/snek'),
			NavigationConfig.from('Gong', SvgIcon.GONG, '/gong'),
			NavigationConfig.from('Malbolge', SvgIcon.ONI, '/malbolge'),
		];
	}
}
