import { Component } from '@angular/core';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { SvgIconService } from 'src/app/shared/svg/svg-icon.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
	title = 'inanity';

	constructor(
		private colorsService: ColorsService,
		private svgIconService: SvgIconService,
	) { }
}
