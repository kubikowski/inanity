import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SettingsComponent } from 'src/app/features/navigation/components/settings/settings.component';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrl: 'header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatIcon, MatIconButton, MatToolbar, MatTooltip,
		DyslexicTextComponent, SettingsComponent,
	],
})
export class HeaderComponent {
	private readonly navigationService = inject(NavigationService);

	public async toggleSidenav(event: Event): Promise<void> {
		(event.currentTarget as HTMLElement).blur();
		await this.navigationService.toggle();
	}
}
