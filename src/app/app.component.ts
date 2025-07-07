import { AfterViewInit, ChangeDetectionStrategy, Component, inject, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { FaviconService } from 'src/app/core/browser/services/favicon.service';
import { RouterService } from 'src/app/core/browser/services/router.service';
import { ScreenService } from 'src/app/core/browser/services/screen.service';
import { TitleService } from 'src/app/core/browser/services/title.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { FontService } from 'src/app/core/fonts/services/font.service';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { BackgroundComponent } from 'src/app/features/background/components/background/background.component';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { FooterComponent } from 'src/app/features/navigation/components/footer/footer.component';
import { HeaderComponent } from 'src/app/features/navigation/components/header/header.component';
import { SidebarComponent } from 'src/app/features/navigation/components/sidebar/sidebar.component';
import { HeaderService } from 'src/app/features/navigation/services/header.service';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrl: 'app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [
		RouterOutlet, MatSidenavModule,
		HeaderComponent, FooterComponent, SidebarComponent, BackgroundComponent,
	],
})
export class AppComponent implements AfterViewInit {
	private readonly animationFrameService = inject(AnimationFrameService);
	private readonly faviconService = inject(FaviconService);
	private readonly routerService = inject(RouterService);
	private readonly screenService = inject(ScreenService);
	private readonly titleService = inject(TitleService);
	private readonly colorsService = inject(ColorsService);
	private readonly fontService = inject(FontService);
	private readonly svgIconService = inject(SvgIconService);
	private readonly backgroundService = inject(BackgroundService);
	private readonly headerService = inject(HeaderService);
	private readonly navigationService = inject(NavigationService);

	public readonly backgroundEnabled = this.backgroundService.enabled;

	private readonly sidenav = viewChild.required<MatSidenav>('sidenav');
	public ngAfterViewInit(): void {
		this.navigationService.initialize(untracked(this.sidenav));
	}
}
