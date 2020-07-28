import { Component, OnInit } from '@angular/core';
import { ColorPalette } from '../shared/color-themes/models/color-palette';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

	styles = document.documentElement.style;

	rootPalette = ColorPalette.getRootPalette();
	colorPalettes = ColorPalette.getPalettes();

	constructor() {
	}

	ngOnInit(): void {
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.preventDefault();

		Object.entries(this.rootPalette)
			.forEach(([key, value]) => {
			this.styles.setProperty( value, `var(${palette[key]})`);
		});
	}

}
