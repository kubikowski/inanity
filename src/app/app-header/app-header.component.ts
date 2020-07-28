import { Component, OnInit } from '@angular/core';
import { ColorPalette } from '../shared/colors/models/color-palette.model';
import { ColorTheme } from '../shared/colors/models/color-theme.model';

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
		this.body.classList.add(this.colorPalettes[0].paletteName);
	}

	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();

		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);

		this.setTheme(theme);
		this.setPalette(this.getPalette());
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();

		this.body.classList.remove(...this.colorPalettes.map(colorPalette => colorPalette.paletteName));
		this.body.classList.add(palette.paletteName);

		this.setPalette(palette);
	}

	getTheme(): ColorTheme {
		for (const colorTheme of this.colorThemes) {
			if (this.body.classList.contains(colorTheme.themeName)) {
				return colorTheme;
			}
		}
		return null;
	}

	setTheme(theme: ColorTheme): void {
		Object.entries(this.rootTheme).forEach(([key, value]) => {
			this.style.setProperty( value, `var(${theme[key]})`);
		});
	}

	getPalette(): ColorPalette {
		for (const colorPalette of this.colorPalettes) {
			if (this.body.classList.contains(colorPalette.paletteName)) {
				return colorPalette;
			}
		}
		return null;
	}

	getComputedPalette(palette: ColorPalette): ColorPalette {
		switch (this.getTheme().themeName) {
			case 'dark-theme':
				return ColorPalette.getInverse(palette);
			case 'light-theme':
			default:
				return palette;
		}
	}

	setPalette(palette: ColorPalette): void {
		const computedPalette = this.getComputedPalette(palette);
		Object.entries(this.rootPalette).forEach(([key, value]) => {
			this.style.setProperty( value, `var(${computedPalette[key]})`);
		});
	}
}
