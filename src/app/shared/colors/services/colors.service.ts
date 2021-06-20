import { Injectable } from '@angular/core';
import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { BluePalette, ColorPalettes } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';

@Injectable({ providedIn: 'root' })
export class ColorsService {

	private _theme: ColorTheme;
	private _palette: ColorPalette;

	constructor() {
		this._theme = this.localStorageTheme;
		this._palette = this.localStoragePalette;

		this.theme = this._theme;
		this.palette = this._palette;
	}

	// region public accessors
	public get theme(): ColorTheme {
		return this._theme;
	}

	public set theme(theme: ColorTheme) {
		this._theme = theme;

		this.localStorageTheme = theme;
		this.documentBodyThemeClass = theme;
		this.cssThemeVariables = theme;

		this.cssPaletteVariables = this._palette;
	}

	public get palette(): ColorPalette {
		return this._palette;
	}

	public set palette(palette: ColorPalette) {
		this._palette = palette;

		this.localStoragePalette = palette;
		this.cssPaletteVariables = palette;
	}
	// endregion public accessors

	// region theme handling
	private get localStorageTheme(): ColorTheme {
		const themeName = localStorage.getItem('theme');

		return ColorThemes.find(colorTheme => colorTheme.themeName === themeName)
			?? LightTheme;
	}

	private set localStorageTheme(theme: ColorTheme) {
		localStorage.setItem('theme', theme.themeName);
	}

	private set documentBodyThemeClass(theme: ColorTheme) {
		const themeNames = ColorThemes.map(colorTheme => colorTheme.themeName);

		document.body.classList.remove(...themeNames);
		document.body.classList.add(theme.themeName);
	}

	private set cssThemeVariables(theme: ColorTheme) {
		const cssThemeEntries = Object.entries(BaseColorTheme.CssThemeVariables);

		cssThemeEntries.forEach(([ themeKey, cssVariableName ]) => {
			const cssVariableValue = theme[themeKey];

			document.documentElement.style.setProperty(cssVariableName, cssVariableValue);
		});
	}
	// endregion theme handling

	// region palette handling
	private get localStoragePalette(): ColorPalette {
		const paletteName = localStorage.getItem('palette');

		return ColorPalettes.find(colorPalette => colorPalette.paletteName === paletteName)
			?? BluePalette;
	}

	private set localStoragePalette(palette: ColorPalette) {
		localStorage.setItem('palette', palette.paletteName);
	}

	private set cssPaletteVariables(palette: ColorPalette) {
		const cssPaletteEntries = Object.entries(BaseColorPalette.CssPaletteVariables);
		const computedPalette = this.getComputedPalette(palette);

		cssPaletteEntries.forEach(([ paletteKey, cssVariableName ]) => {
			const cssVariableValue = computedPalette[paletteKey];

			document.documentElement.style.setProperty(cssVariableName, cssVariableValue);
		});
	}

	private getComputedPalette(palette: ColorPalette): ColorPalette {
		switch (this._theme.themeName) {
			case 'dark-theme':
				return palette.getInverse();
			case 'light-theme':
			default:
				return palette;
		}
	}
	// endregion palette handling
}
