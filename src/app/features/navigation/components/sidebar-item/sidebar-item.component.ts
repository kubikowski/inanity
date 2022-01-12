import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationConfig } from 'src/app/features/navigation/models/navigation-config.model';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: [ './sidebar-item.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent implements OnInit {
	@Input() public config!: NavigationConfig;

	public constructor(
		private readonly navigationService: NavigationService,
	) { }

	public ngOnInit(): void {
		if (typeof this.config === 'undefined') {
			throw new Error('missing input: config');
		}
	}

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
