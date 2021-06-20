import { Injectable } from '@angular/core';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { BluePalette, ColorPalettes } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from 'src/app/shared/colors/models/color-themes/color-themes.constant';

@Injectable()
export class ColorsService {

	private _theme: ColorTheme;
	private _palette: ColorPalette;

	constructor() {
		this._theme = ColorsService.localStorageTheme;
		this._palette = ColorsService.localStoragePalette;

		this.theme = this._theme;
		this.palette = this._palette;
	}

	// region public accessors
	public get theme(): ColorTheme {
		return this._theme;
	}

	public set theme(theme: ColorTheme) {
		this._theme = theme;

		ColorsService.localStorageTheme = theme;
		ColorsService.documentBodyThemeClass = theme;
		ColorsService.cssThemeVariables = theme;

		ColorsService.cssPaletteVariables = this.computedPalette;
	}

	public get palette(): ColorPalette {
		return this._palette;
	}

	public set palette(palette: ColorPalette) {
		this._palette = palette;

		ColorsService.localStoragePalette = palette;

		ColorsService.cssPaletteVariables = this.computedPalette;
	}

	private get computedPalette(): ColorPalette {
		return (this._palette.theme.themeName !== this._theme.themeName)
			? this._palette.inverse(this._theme)
			: this._palette;
	}
	// endregion public accessors

	// region theme handling
	private static get localStorageTheme(): ColorTheme {
		const themeName = localStorage.getItem('theme');

		return ColorThemes.find(colorTheme => colorTheme.themeName === themeName)
			?? LightTheme;
	}

	private static set localStorageTheme(theme: ColorTheme) {
		localStorage.setItem('theme', theme.themeName);
	}

	private static set documentBodyThemeClass(theme: ColorTheme) {
		const themeNames = ColorThemes.map(colorTheme => colorTheme.themeName);

		document.body.classList.remove(...themeNames);
		document.body.classList.add(theme.themeName);
	}

	private static set cssThemeVariables(theme: ColorTheme) {
		const cssThemeEntries = Object.entries(BaseColorTheme.CssThemeVariables);

		cssThemeEntries.forEach(([ themeKey, cssVariableName ]) => {
			const cssVariableValue = theme[themeKey];

			document.documentElement.style.setProperty(cssVariableName, cssVariableValue);
		});
	}
	// endregion theme handling

	// region palette handling
	private static get localStoragePalette(): ColorPalette {
		const paletteName = localStorage.getItem('palette');

		return ColorPalettes.find(colorPalette => colorPalette.paletteName === paletteName)
			?? BluePalette;
	}

	private static set localStoragePalette(palette: ColorPalette) {
		localStorage.setItem('palette', palette.paletteName);
	}

	private static set cssPaletteVariables(palette: ColorPalette) {
		const cssPaletteEntries = Object.entries(BaseColorPalette.CssPaletteVariables);

		cssPaletteEntries.forEach(([ paletteKey, cssVariableName ]) => {
			const cssVariableValue = palette[paletteKey];

			document.documentElement.style.setProperty(cssVariableName, cssVariableValue);
		});
	}
	// endregion palette handling
}
