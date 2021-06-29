import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {

	@ViewChild('sidenav') private sidenav: MatSidenav;

	constructor(
		private readonly navigationService: NavigationService,
		private readonly colorsService: ColorsService,
		private readonly screenDetectorService: ScreenDetectorService,
		private readonly svgIconService: SvgIconService,
	) { }

	ngAfterViewInit(): void {
		this.navigationService.initialize(this.sidenav);
	}
}
