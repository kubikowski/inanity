import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BaseColorPalette } from 'src/app/shared/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { BluePalette, GreenPalette } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from 'src/app/shared/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { DarkTheme, LightTheme } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';

describe('ColorsService', () => {
	let colorsService: ColorsService;

	const body = document.body;
	const style = document.documentElement.style;

	let theme: ColorTheme;
	let palette: ColorPalette;

	const BUFFER_TIME = 50;

	/** must be encapsulated by a fakeAsync */
	function setDarkTheme(): void {
		colorsService.theme = DarkTheme;

		theme = DarkTheme;
		palette = palette.inverse(DarkTheme);

		tick(BUFFER_TIME);
	}

	/** must be encapsulated by a fakeAsync */
	function setGreenPalette(): void {
		colorsService.palette = GreenPalette;

		palette = (theme === LightTheme)
			? GreenPalette
			: GreenPalette.inverse(theme);

		tick(BUFFER_TIME);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ ColorsService ],
		});
		colorsService = TestBed.inject(ColorsService);

		theme = LightTheme;
		palette = BluePalette;
	});

	afterEach(() => {
		colorsService.theme = LightTheme;
		colorsService.palette = BluePalette;
	});

	describe('LocalStorage', () => {
		it('should have set "theme": "light-theme" in localstorage', () => {
			expect(localStorage.getItem('theme')).toBe(theme.themeName);
		});

		it('should have set "palette": "blue-palette" in localstorage', () => {
			expect(localStorage.getItem('palette')).toBe(palette.paletteName);
		});

		it('should update "theme": "dark-theme" in localstorage', fakeAsync(() => {
			setDarkTheme();
			expect(localStorage.getItem('theme')).toBe(theme.themeName);
		}));

		it('should update "palette": "green-palette" in localstorage', fakeAsync(() => {
			setGreenPalette();
			expect(localStorage.getItem('palette')).toBe(palette.paletteName);
		}));
	});

	describe('Body Theme Class', () => {
		it('should have set "light-theme" class on body', () => {
			expect(body.classList.contains(theme.themeName)).toBeTruthy();
		});

		it('should update "dark-theme" class on body', fakeAsync(() => {
			setDarkTheme();
			expect(body.classList.contains(theme.themeName)).toBeTruthy();
		}));
	});

	describe('CSS Variables', () => {
		it('should have set theme css values on element', () => {
			Object.entries(BaseColorTheme.CssThemeVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(theme[key]);
			});
		});

		it('should have set palette css values on element', () => {
			Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(palette[key]);
			});
		});

		it('should update theme css values on toggleTheme', fakeAsync(() => {
			setDarkTheme();
			Object.entries(BaseColorTheme.CssThemeVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(theme[key]);
			});
		}));

		it('should update palette css values on togglePalette', fakeAsync(() => {
			setGreenPalette();
			Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(palette[key]);
			});
		}));

		it('should update inverse palette css values on toggleTheme', fakeAsync(() => {
			setDarkTheme();
			Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(palette[key]);
			});
		}));
	});
});
