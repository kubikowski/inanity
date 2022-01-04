import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

	public constructor(
		private readonly navigationService: NavigationService,
	) { }

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
