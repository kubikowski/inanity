import { Injectable } from '@angular/core';
import { BaseColorTheme } from '../models/color-themes/base-color-theme.model';
import { ColorTheme } from '../models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from '../models/color-themes/color-themes.constant';
import { BaseColorPalette } from '../models/color-palettes/base-color-palette.model';
import { ColorPalette } from '../models/color-palettes/color-palette.model';
import { ColorPalettes, BluePalette } from '../models/color-palettes/color-palettes.constant';

@Injectable({
	providedIn: 'root'
})
export class ColorsService {

	// Document
	private readonly body = document.body;
	private readonly style = document.documentElement.style;

	constructor() {
		// Get Initial Theme and Palette
		const theme = this.getThemeFromName(localStorage.getItem('theme')) ?? LightTheme;
		const palette = this.getPaletteFromName(localStorage.getItem('palette')) ?? BluePalette;

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
		this.body.classList.remove(...ColorPalettes.map(colorPalette => colorPalette.paletteName));
		this.body.classList.add(palette.paletteName);
		localStorage.setItem('palette', palette.paletteName);

		this.setPalette(palette);
	}

	private getThemeFromName(themeName: string): ColorTheme {
		return ColorThemes.find(colorTheme => colorTheme.themeName === themeName);
	}

	private getThemeFromBody(): ColorTheme {
		for (const colorTheme of ColorThemes) {
			if (this.body.classList.contains(colorTheme.themeName)) {
				return colorTheme;
			}
		}
		return null;
	}

	private setTheme(theme: ColorTheme): void {
		Object.entries(BaseColorTheme.CssThemeVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, theme[key]);
		});
	}

	private getPaletteFromName(paletteName: string): ColorPalette {
		return ColorPalettes.find(colorPalette => colorPalette.paletteName === paletteName);
	}

	private getPaletteFromBody(): ColorPalette {
		for (const colorPalette of ColorPalettes) {
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
		Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, computedPalette[key]);
		});
	}
}
