import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AnimationFrameService } from 'src/app/core/browser/animation-frame.service';
import { FaviconService } from 'src/app/core/browser/favicon.service';
import { ScreenDetectorService } from 'src/app/core/browser/screen-detector.service';
import { TitleService } from 'src/app/core/browser/title.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { HeaderService } from 'src/app/features/navigation/services/header.service';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

	public constructor(
		private readonly animationFrameService: AnimationFrameService,
		private readonly faviconService: FaviconService,
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly titleService: TitleService,
		private readonly colorsService: ColorsService,
		private readonly svgIconService: SvgIconService,
		private readonly headerService: HeaderService,
		private readonly navigationService: NavigationService,
	) { }

	@ViewChild('sidenav', { static: true })
	private set sidenav(sidenav: MatSidenav) {
		this.navigationService.initialize(sidenav);
	}
}
