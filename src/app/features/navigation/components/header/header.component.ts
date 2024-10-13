import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SettingsComponent } from 'src/app/features/navigation/components/settings/settings.component';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrl: 'header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatToolbar,
		MatIconButton,
		MatIcon,
		DyslexicTextComponent,
		SettingsComponent
	]
})
export class HeaderComponent {
	private readonly navigationService = inject(NavigationService);

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
