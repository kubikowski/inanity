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
		// Get Initial Theme and Palette
		const theme = this.getThemeFromName(localStorage.getItem('theme')) ?? this.colorThemes[0];
		const palette = this.getPaletteFromName(localStorage.getItem('palette')) ?? this.colorPalettes[0];

		// Initialize Body ClassList
		this.body.classList.add(theme.themeName);
		this.body.classList.add(palette.paletteName);

		// Initialize Theme and Palette
		this.toggleTheme(theme);
		this.togglePalette(palette);
	}

	toggleTheme(theme: ColorTheme): void {
		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);
		localStorage.setItem('theme', theme.themeName);

		this.setTheme(theme);
		this.setPalette(this.getPaletteFromBody());
	}

	togglePalette(palette: ColorPalette): void {
		this.body.classList.remove(...this.colorPalettes.map(colorPalette => colorPalette.paletteName));
		this.body.classList.add(palette.paletteName);
		localStorage.setItem('palette', palette.paletteName);

		this.setPalette(palette);
	}

	getThemeFromName(themeName: string): ColorTheme {
		return this.colorThemes.find(colorTheme => colorTheme.themeName === themeName);
	}

	getThemeFromBody(): ColorTheme {
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

	getPaletteFromName(paletteName: string): ColorPalette {
		return this.colorPalettes.find(colorPalette => colorPalette.paletteName === paletteName);
	}

	getPaletteFromBody(): ColorPalette {
		for (const colorPalette of this.colorPalettes) {
			if (this.body.classList.contains(colorPalette.paletteName)) {
				return colorPalette;
			}
		}
		return null;
	}

	getComputedPalette(palette: ColorPalette): ColorPalette {
		switch (this.getThemeFromBody().themeName) {
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
