import { Component, OnInit } from '@angular/core';
import { ColorPalette } from '../shared/color-themes/models/color-palette';
import { ColorTheme } from '../shared/color-themes/models/color-theme';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

	body = document.body;
	style = document.documentElement.style;

	// Color Themes
	rootTheme = ColorTheme.getRootTheme();
	colorThemes = ColorTheme.getThemes();

	// Color Palettes
	rootPalette = ColorPalette.getRootPalette();
	colorPalettes = ColorPalette.getPalettes();

	constructor() {
	}

	ngOnInit(): void {
		this.body.classList.add(this.colorThemes[0].themeName);
	}

	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();

		Object.entries(this.rootTheme)
			.forEach(([key, value]) => {
				this.style.setProperty( value, `var(${theme[key]})`);
			});

		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();

		Object.entries(this.rootPalette)
			.forEach(([key, value]) => {
			this.style.setProperty( value, `var(${palette[key]})`);
		});
	}
}
