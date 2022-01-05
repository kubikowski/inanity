import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'rxjs-observed-decorator';
import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { BluePalette, ColorPalettes } from 'src/app/core/colors/models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from 'src/app/core/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { ColorThemes, LightTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { SubSink } from 'subsink';

@Injectable({ providedIn: 'root' })
export class ColorsService implements OnDestroy {
	private readonly subscriptions = new SubSink();
	private readonly renderer: Renderer2;

	private readonly body: HTMLElement;
	private readonly element: HTMLElement;

	@Observed() public theme: ColorTheme;
	@Observed() public palette: ColorPalette;

	public readonly theme$: Observable<ColorTheme>;
	public readonly palette$: Observable<ColorPalette>;

	public constructor(
		@Inject(DOCUMENT) private readonly document: HTMLDocument,
		private readonly rendererFactory: RendererFactory2,
	) {
		this.body = this.document.body;
		this.element = this.document.documentElement;
		this.renderer = this.rendererFactory.createRenderer(this.body, null);

		this.theme = ColorsService.localStorageTheme;
		this.palette = ColorsService.localStoragePalette;

		this.subscriptions.sink = this.theme$
			.subscribe(theme => this.setTheme(theme));
		this.subscriptions.sink = this.palette$
			.subscribe(palette => this.setPalette(palette));
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	// region setters
	private setTheme(theme: ColorTheme): void {
		ColorsService.localStorageTheme = theme;
		this.documentBodyThemeClass = theme;
		this.cssThemeVariables = theme;

		this.cssPaletteVariables = this.computedPalette;
	}

	private setPalette(palette: ColorPalette): void {
		ColorsService.localStoragePalette = palette;

		this.cssPaletteVariables = this.computedPalette;
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

	private set documentBodyThemeClass(theme: ColorTheme) {
		ColorThemes.forEach(colorTheme =>
			this.renderer.removeClass(this.body, colorTheme.themeName));

		this.renderer.addClass(this.body, theme.themeName);
	}

	private set cssThemeVariables(theme: ColorTheme) {
		const cssThemeEntries = Object.entries(BaseColorTheme.CssVariables);

		cssThemeEntries.forEach(([ themeKey, cssVariableName ]) => {
			const cssVariableValue = theme[themeKey];

			this.renderer.setStyle(this.element, cssVariableName, cssVariableValue, 2);
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

	private set cssPaletteVariables(palette: ColorPalette) {
		const cssPaletteEntries = Object.entries(BaseColorPalette.CssVariables);

		cssPaletteEntries.forEach(([ paletteKey, cssVariableName ]) => {
			const cssVariableValue = palette[paletteKey];

			this.renderer.setStyle(this.element, cssVariableName, cssVariableValue, 2);
		});
	}
	// endregion palette handling
}
