import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { ScreenDetectorService } from 'src/app/shared/screen-detector/screen-detector.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from './navigation/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {

	@ViewChild('sidenav') private sidenav: MatSidenav;

	constructor(
		private readonly colorsService: ColorsService,
		private readonly svgIconService: SvgIconService,
		private readonly navigationService: NavigationService,
		private readonly screenDetectorService: ScreenDetectorService,
	) { }

	ngAfterViewInit(): void {
		this.navigationService.initialize(this.sidenav);
	}
}
