import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FaviconService } from 'src/app/core/browser/favicon.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { TitleService } from 'src/app/core/routing/title.service';
import { FpsService } from 'src/app/core/screen/fps.service';
import { ScreenDetectorService } from 'src/app/core/screen/screen-detector.service';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { NavigationService } from 'src/app/features/navigation/services/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

	constructor(
		private readonly navigationService: NavigationService,
		private readonly titleService: TitleService,
		private readonly colorsService: ColorsService,
		private readonly faviconService: FaviconService,
		private readonly fpsService: FpsService,
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly svgIconService: SvgIconService,
	) { }

	@ViewChild('sidenav', { static: true })
	private set sidenav(sidenav: MatSidenav) {
		this.navigationService.initialize(sidenav);
	}
}
