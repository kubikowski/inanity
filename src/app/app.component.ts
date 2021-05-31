import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from './navigation/navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements AfterViewInit {

	@ViewChild('sidenav') private sidenav: MatSidenav;

	constructor(
		private colorsService: ColorsService,
		private svgIconService: SvgIconService,
		private navigationService: NavigationService,
	) { }

	ngAfterViewInit(): void {
		this.navigationService.initialize(this.sidenav);
	}
}
