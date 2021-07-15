import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { BluePalette, ColorPalettes } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { Observed } from 'src/app/shared/decorators/observed.decorator';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class ColorsService {
	private readonly subscriptions = new SubSink();

	@Observed() public theme: ColorTheme;
	@Observed() public palette: ColorPalette;

	public readonly theme$: Observable<ColorTheme>;
	public readonly palette$: Observable<ColorPalette>;

	constructor() {
		this.theme = ColorsService.localStorageTheme;
		this.palette = ColorsService.localStoragePalette;

		this.subscriptions.sink = this.theme$
			.pipe(debounceTime(0))
			.subscribe(theme => this.setTheme(theme));

		this.subscriptions.sink = this.palette$
			.pipe(debounceTime(0))
			.subscribe(palette => this.setPalette(palette));
	}

	// region setters
	private setTheme(theme: ColorTheme): void {
		ColorsService.localStorageTheme = theme;
		ColorsService.documentBodyThemeClass = theme;
		ColorsService.cssThemeVariables = theme;

		ColorsService.cssPaletteVariables = this.computedPalette;
	}

	private setPalette(palette: ColorPalette): void {
		ColorsService.localStoragePalette = palette;

		ColorsService.cssPaletteVariables = this.computedPalette;
	}

	private get computedPalette(): ColorPalette {
		return (this.palette.theme.themeName !== this.theme.themeName)
			? this.palette.inverse(this.theme)
			: this.palette;
	}
	// region setters

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
