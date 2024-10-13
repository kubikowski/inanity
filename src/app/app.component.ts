import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AnimationFrameService } from 'src/app/core/browser/animation-frame.service';
import { FaviconService } from 'src/app/core/browser/favicon.service';
import { ScreenDetectorService } from 'src/app/core/browser/screen-detector.service';
import { TitleService } from 'src/app/core/browser/title.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { BackgroundComponent } from 'src/app/features/background/components/background/background.component';
import { HeaderComponent } from 'src/app/features/navigation/components/header/header.component';
import { SidebarComponent } from 'src/app/features/navigation/components/sidebar/sidebar.component';
import { HeaderService } from 'src/app/features/navigation/services/header.service';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrl: 'app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		RouterOutlet, MatSidenavModule,
		HeaderComponent, SidebarComponent, BackgroundComponent,
	],
})
export class AppComponent {
	private readonly animationFrameService = inject(AnimationFrameService);
	private readonly faviconService = inject(FaviconService);
	private readonly screenDetectorService = inject(ScreenDetectorService);
	private readonly titleService = inject(TitleService);
	private readonly colorsService = inject(ColorsService);
	private readonly svgIconService = inject(SvgIconService);
	private readonly headerService = inject(HeaderService);
	private readonly navigationService = inject(NavigationService);

	@ViewChild('sidenav', { static: true })
	private set sidenav(sidenav: MatSidenav) {
		this.navigationService.initialize(sidenav);
	}
}
