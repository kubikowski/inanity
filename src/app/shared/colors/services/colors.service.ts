import { Injectable } from '@angular/core';
import { ColorTheme } from '../models/color-theme.model';
import { ColorPalette } from '../models/color-palette.model';

@Injectable({
	providedIn: 'root'
})
export class ColorsService {

	// Document
	body = document.body;
	style = document.documentElement.style;

	// Color Themes
	rootTheme = ColorTheme.getRootTheme();
	colorThemes = ColorTheme.getThemes();

	// Color Palettes
	rootPalette = ColorPalette.getRootPalette();
	colorPalettes = ColorPalette.getPalettes();

	constructor() {
		this.body.classList.add(this.colorThemes[0].themeName);
		this.body.classList.add(this.colorPalettes[0].paletteName);
	}

	toggleTheme(theme: ColorTheme): void {
		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);

		this.setTheme(theme);
		this.setPalette(this.getPalette());
	}

	togglePalette(palette: ColorPalette): void {
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
