import { Injectable } from '@angular/core';
import { BaseColorTheme } from '../models/color-themes/base-color-theme.model';
import { ColorTheme } from '../models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from '../models/color-themes/color-themes.constant';
import { BaseColorPalette } from '../models/color-palettes/base-color-palette.model';
import { ColorPalette } from '../models/color-palettes/color-palette.model';
import { ColorPalettes, BluePalette } from '../models/color-palettes/color-palettes.constant';

@Injectable({ providedIn: 'root' })
export class ColorsService {
	// Document
	private readonly body = document.body;
	private readonly style = document.documentElement.style;

	private theme: ColorTheme;
	private palette: ColorPalette;

	constructor() {
		// Get Initial Theme and Palette
		this.theme = this.getThemeFromName(localStorage.getItem('theme')) ?? LightTheme;
		this.palette = this.getPaletteFromName(localStorage.getItem('palette')) ?? BluePalette;

		// Initialize Body ClassList
		this.body.classList.add(this.theme.themeName);

		// Initialize Theme and Palette
		this.toggleTheme(this.theme);
		this.togglePalette(this.palette);
	}

	public toggleTheme(theme: ColorTheme): void {
		this.theme = theme;
		this.body.classList.remove('light-theme', 'dark-theme');
		this.body.classList.add(theme.themeName);
		localStorage.setItem('theme', theme.themeName);

		this.setTheme(theme);
		this.setPalette(this.palette);
	}

	public togglePalette(palette: ColorPalette): void {
		this.palette = palette;
		localStorage.setItem('palette', palette.paletteName);

		this.setPalette(palette);
	}

	private getThemeFromName(themeName: string): ColorTheme {
		return ColorThemes.find(colorTheme => colorTheme.themeName === themeName);
	}

	private setTheme(theme: ColorTheme): void {
		Object.entries(BaseColorTheme.CssThemeVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, theme[key]);
		});
	}

	private getPaletteFromName(paletteName: string): ColorPalette {
		return ColorPalettes.find(colorPalette => colorPalette.paletteName === paletteName);
	}

	private setPalette(palette: ColorPalette): void {
		const computedPalette = this.getComputedPalette(palette);
		Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
			this.style.setProperty(cssVariable, computedPalette[key]);
		});
	}

	private getComputedPalette(palette: ColorPalette): ColorPalette {
		switch (this.theme.themeName) {
			case 'dark-theme':
				return palette.getInverse();
			case 'light-theme':
			default:
				return palette;
		}
	}
}
