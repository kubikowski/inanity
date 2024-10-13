import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { HeaderService } from 'src/app/features/navigation/services/header.service';

@Component({
	selector: 'settings',
	templateUrl: 'settings.component.html',
	styleUrl: 'settings.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger,
	],
})
export class SettingsComponent {
	private readonly headerService = inject(HeaderService);

	public readonly settingsItems = this.headerService.settingsItems;
}
