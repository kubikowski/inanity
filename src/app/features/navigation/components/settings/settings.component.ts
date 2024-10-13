import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderService } from 'src/app/features/navigation/services/header.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
	private readonly headerService = inject(HeaderService);

	public readonly settingsItems = this.headerService.settingsItems;
}
