import { computed, DOCUMENT, effect, inject, Injectable, RendererFactory2, RendererStyleFlags2, signal } from '@angular/core';
import { ColorPaletteUtil } from 'src/app/core/colors/models/color-palettes/color-palette-util.model';
import { ColorThemeUtil } from 'src/app/core/colors/models/color-themes/color-theme-util.model';
import { BaseColorPalette } from '../models/color-palettes/base-color-palette.model';
import { ColorPalette } from '../models/color-palettes/color-palette.model';
import { BaseColorTheme } from '../models/color-themes/base-color-theme.model';
import { ColorTheme } from '../models/color-themes/color-theme.model';

@Injectable({ providedIn: 'root' })
export class ColorsService {
	private readonly document = inject(DOCUMENT);
	private readonly body = this.document.body;
	private readonly element = this.document.documentElement;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.body, null);

	public readonly theme = signal(ColorsService.localStorageTheme);
	public readonly palette = signal(ColorsService.localStoragePalette);

	public readonly computedPalette = computed(() => this.getComputedPalette());

	public constructor() {
		effect(() => this.setTheme(this.theme()));
		effect(() => this.setPalette(this.palette()));
	}


	// region setters
	private setTheme(theme: ColorTheme): void {
		ColorsService.localStorageTheme = theme;
		this.documentBodyThemeClass = theme;
		this.cssThemeVariables = theme;

		this.cssPaletteVariables = this.getComputedPalette();
	}

	private setPalette(palette: ColorPalette): void {
		ColorsService.localStoragePalette = palette;

		this.cssPaletteVariables = this.getComputedPalette();
	}

	private getComputedPalette(): ColorPalette {
		const theme = this.theme();
		const palette = this.palette();

		return (theme.prefers === 'dark')
			? palette.inverse(theme)
			: palette.copy(theme);
	}
	// region setters


	// region theme handling
	private static get localStorageTheme(): ColorTheme {
		const themeName = localStorage.getItem('theme');

		return ColorThemeUtil.named(themeName);
	}

	private static set localStorageTheme(theme: ColorTheme) {
		localStorage.setItem('theme', theme.themeName);
	}

	private set documentBodyThemeClass(theme: ColorTheme) {
		ColorThemeUtil.all.forEach(colorTheme =>
			this.renderer.removeClass(this.body, `${ colorTheme.prefers }-theme`));

		this.renderer.addClass(this.body, `${ theme.prefers }-theme`);
	}

	private set cssThemeVariables(theme: ColorTheme) {
		const cssThemeEntries = Object.entries(BaseColorTheme.CssVariables) as [ keyof BaseColorTheme, string ][];

		cssThemeEntries.forEach(([ themeKey, cssVariableName ]) => {
			const cssVariableValue = theme[themeKey];

			this.renderer.setStyle(this.element, cssVariableName, cssVariableValue, RendererStyleFlags2.DashCase);
		});
	}
	// endregion theme handling


	// region palette handling
	private static get localStoragePalette(): ColorPalette {
		const paletteName = localStorage.getItem('palette');

		return ColorPaletteUtil.named(paletteName);
	}

	private static set localStoragePalette(palette: ColorPalette) {
		localStorage.setItem('palette', palette.paletteName);
	}

	private set cssPaletteVariables(palette: ColorPalette) {
		const cssPaletteEntries = Object.entries(BaseColorPalette.CssVariables) as [ keyof BaseColorPalette, string ][];

		cssPaletteEntries.forEach(([ paletteKey, cssVariableName ]) => {
			const cssVariableValue = palette[paletteKey];

			this.renderer.setStyle(this.element, cssVariableName, cssVariableValue, RendererStyleFlags2.DashCase);
		});
	}
	// endregion palette handling
}
