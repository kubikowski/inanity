import { Component, OnInit } from '@angular/core';
import { ColorPalette } from '../shared/color-themes/models/color-palette';
import { ColorTheme } from '../shared/color-themes/models/color-theme';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

	styles = document.documentElement.style;

	// Color Themes
	rootTheme = ColorTheme.getRootTheme();
	colorThemes = ColorTheme.getThemes();

	// Color Palettes
	rootPalette = ColorPalette.getRootPalette();
	colorPalettes = ColorPalette.getPalettes();

	constructor() {
	}

	ngOnInit(): void {
	}

	toggleTheme(theme: ColorTheme, event: Event): void {
		event.preventDefault();

		Object.entries(this.rootTheme)
			.forEach(([key, value]) => {
				this.styles.setProperty( value, `var(${theme[key]})`);
			});
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.preventDefault();

		Object.entries(this.rootPalette)
			.forEach(([key, value]) => {
			this.styles.setProperty( value, `var(${palette[key]})`);
		});
	}
}
