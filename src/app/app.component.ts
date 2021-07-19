import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { TitleService } from 'src/app/navigation/routing/title.service';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { FpsService } from 'src/app/shared/screen-detector/fps.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';

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
		private readonly fpsService: FpsService,
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly svgIconService: SvgIconService,
	) { }

	@ViewChild('sidenav', { static: true })
	private set sidenav(sidenav: MatSidenav) {
		this.navigationService.initialize(sidenav);
	}
}
