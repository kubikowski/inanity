import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { FontsComponent } from 'src/app/core/fonts/components/fonts/fonts.component';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { SidebarItemComponent } from 'src/app/features/navigation/components/sidebar-item/sidebar-item.component';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrl: 'sidebar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatIcon, MatIconButton, MatIconAnchor, MatToolbar,
		DyslexicTextComponent, SidebarItemComponent, FontsComponent,
	],
})
export class SidebarComponent {
	private readonly navigationService = inject(NavigationService);

	public readonly navigationItems = this.navigationService.navigationItems;

	public readonly githubLink = 'https://github.com/kubikowski/inanity';
	public readonly GitHubIcon = SvgIcon.GITHUB;
	public readonly version = environment.version;

	public async toggleSidenav(event: Event): Promise<void> {
		(event.currentTarget as HTMLElement).blur();
		await this.navigationService.toggle();
	}
}
