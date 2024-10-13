import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { DyslexicTextComponent } from 'src/app/features/dyslexia/components/dyslexic-text/dyslexic-text.component';
import { FontsComponent } from 'src/app/features/navigation/components/fonts/fonts.component';
import { SidebarItemComponent } from 'src/app/features/navigation/components/sidebar-item/sidebar-item.component';
import { NavigationConfig } from 'src/app/features/navigation/models/navigation-config.model';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrl: 'sidebar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatIcon, MatIconButton, MatIconAnchor, MatToolbar,
		DyslexicTextComponent, SidebarItemComponent, FontsComponent,
	],
})
export class SidebarComponent {
	private readonly navigationService = inject(NavigationService);

	public readonly navigationConfigs = [
		NavigationConfig.from('About', SvgIcon.GOAT, '/about'),
		NavigationConfig.from('Snek', SvgIcon.SNAKE, '/snek'),
		NavigationConfig.from('Gong', SvgIcon.GONG, '/gong'),
		NavigationConfig.from('Noise', SvgIcon.ONI, '/background'),
	] as const;

	public readonly githubLink = 'https://github.com/kubikowski/inanity';
	public readonly GitHubIcon = SvgIcon.GITHUB;
	public readonly version = environment.version;

	public toggleSidenav(event: Event): void {
		(event.currentTarget as HTMLElement).blur();
		this.navigationService.toggle();
	}
}
