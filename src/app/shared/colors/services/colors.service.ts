import { Injectable } from '@angular/core';
import { BaseColorTheme } from '../models/base-color-theme.model';
import { ColorTheme } from '../models/color-theme.model';
import { BaseColorPalette } from '../models/base-color-palette.model';
import { ColorPalette } from '../models/color-palette.model';

@Injectable({
	providedIn: 'root'
})
export class ColorsService {

	// Document
	private readonly body = document.body;
	private readonly style = document.documentElement.style;

	// Color Themes
	private readonly CssThemeVariables = BaseColorTheme.CssThemeVariables;
	private readonly colorThemes = ColorTheme.Themes;

	// Color Palettes
	private readonly CssPaletteVariables = BaseColorPalette.CssPaletteVariables;
	private readonly colorPalettes = ColorPalette.Palettes;

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

	public toggleTheme(theme: ColorTheme): void {
		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);
		localStorage.setItem('theme', theme.themeName);

		this.setTheme(theme);
		this.setPalette(this.getPaletteFromBody());
	}

	public togglePalette(palette: ColorPalette): void {
		this.body.classList.remove(...this.colorPalettes.map(colorPalette => colorPalette.paletteName));
		this.body.classList.add(palette.paletteName);
		localStorage.setItem('palette', palette.paletteName);

		this.setPalette(palette);
	}

	private getThemeFromName(themeName: string): ColorTheme {
		return this.colorThemes.find(colorTheme => colorTheme.themeName === themeName);
	}

	private getThemeFromBody(): ColorTheme {
		for (const colorTheme of this.colorThemes) {
			if (this.body.classList.contains(colorTheme.themeName)) {
				return colorTheme;
			}
		}
		return null;
	}

	private setTheme(theme: ColorTheme): void {
		Object.entries(this.CssThemeVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, theme[key]);
		});
	}

	private getPaletteFromName(paletteName: string): ColorPalette {
		return this.colorPalettes.find(colorPalette => colorPalette.paletteName === paletteName);
	}

	private getPaletteFromBody(): ColorPalette {
		for (const colorPalette of this.colorPalettes) {
			if (this.body.classList.contains(colorPalette.paletteName)) {
				return colorPalette;
			}
		}
		return null;
	}

	private getComputedPalette(palette: ColorPalette): ColorPalette {
		switch (this.getThemeFromBody().themeName) {
			case 'dark-theme':
				return palette.getInverse();
			case 'light-theme':
			default:
				return palette;
		}
	}

	private setPalette(palette: ColorPalette): void {
		const computedPalette = this.getComputedPalette(palette);
		Object.entries(this.CssPaletteVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, computedPalette[key]);
		});
	}
}
