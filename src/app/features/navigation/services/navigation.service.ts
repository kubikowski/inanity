import { computed, inject, Injectable, isDevMode } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { NavigationItem } from 'src/app/features/navigation/models/navigation-item.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
	private readonly backgroundService = inject(BackgroundService);

	public readonly navigationItems = computed(() => ([
		NavigationItem.from('About', SvgIcon.GOAT, '/about'),
		NavigationItem.from('Set Theory', SvgIcon.SET_UTILITIES, '/set-utilities'),
		NavigationItem.from('Snek', SvgIcon.SNAKE, '/snek'),
		NavigationItem.from('Sprinter', SvgIcon.SPRINTER, '/sprinter', isDevMode()),
		NavigationItem.from('Gong', SvgIcon.GONG, '/gong', isDevMode()),
		NavigationItem.from('Noise', SvgIcon.GONG, '/background', this.backgroundService.moving()),
	].filter(navigationItem => navigationItem.enabled)));


	private sidenav?: MatSidenav;

	public initialize(sidenav: MatSidenav): void {
		this.sidenav = sidenav;
	}

	public async toggle(): Promise<void> {
		await this.sidenav?.toggle();
	}
}
