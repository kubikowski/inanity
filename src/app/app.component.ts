import { Component, OnInit } from '@angular/core';
import { SvgIconService } from './shared/svg/svg-icon.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
	title = 'inanity';

	constructor(
		private svgIconService: SvgIconService
	) { }

	ngOnInit(): void {
		this.svgIconService.registerIcons();
	}
}
