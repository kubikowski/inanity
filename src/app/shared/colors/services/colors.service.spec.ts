import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ColorsService } from './colors.service';
import { DarkTheme, LightTheme } from '../models/color-themes/color-themes.constant';
import { BluePalette, GreenPalette } from '../models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from '../models/color-themes/base-color-theme.model';
import { BaseColorPalette } from '../models/color-palettes/base-color-palette.model';
import { ColorTheme } from '../models/color-themes/color-theme.model';
import { ColorPalette } from '../models/color-palettes/color-palette.model';

describe('ColorsService', () => {
	let colorsService: ColorsService;

	const body = document.body;
	const style = document.documentElement.style;

	let theme: ColorTheme;
	let palette: ColorPalette;

	const BUFFER_TIME = 50;

	function setDarkTheme(): void {
		fakeAsync(() => {
			colorsService.toggleTheme(DarkTheme);
			theme = DarkTheme;
			tick(BUFFER_TIME);
		});
	}

	function setGreenPalette(): void {
		fakeAsync(() => {
			colorsService.togglePalette(GreenPalette);
			palette = GreenPalette;
			tick(BUFFER_TIME);
		});
	}

	beforeEach(() => {
		TestBed.configureTestingModule({});
		colorsService = TestBed.inject(ColorsService);

		theme = LightTheme;
		palette = BluePalette;
	});

	afterEach(() => {
		colorsService.toggleTheme(LightTheme);
		colorsService.togglePalette(BluePalette);
	});

	describe('LocalStorage', () => {
		it('should have set "theme": "light-theme" in localstorage', () => {
			expect(localStorage.getItem('theme')).toBe(theme.themeName);
		});

		it('should have set "palette": "blue-palette" in localstorage', () => {
			expect(localStorage.getItem('palette')).toBe(palette.paletteName);
		});

		it('should update "theme": "dark-theme" in localstorage', () => {
			setDarkTheme();
			expect(localStorage.getItem('theme')).toBe(theme.themeName);
		});

		it('should update "palette": "green-palette" in localstorage', () => {
			setGreenPalette();
			expect(localStorage.getItem('palette')).toBe(palette.paletteName);
		});
	});

	describe('Body Theme Class', () => {
		it('should have set "light-theme" class on body', () => {
			expect(body.classList.contains(theme.themeName)).toBeTruthy();
		});

		it('should update "dark-theme" class on body', () => {
			setDarkTheme();
			expect(body.classList.contains(theme.themeName)).toBeTruthy();
		});
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

		it('should update theme css values on toggleTheme', () => {
			setDarkTheme();
			Object.entries(BaseColorTheme.CssThemeVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(theme[key]);
			});
		});

		it('should update palette css values on togglePalette', () => {
			setGreenPalette();
			Object.entries(BaseColorPalette.CssPaletteVariables).forEach(([key, cssVariable]) => {
				expect(style.getPropertyValue(cssVariable)).toBe(palette[key]);
			});
		});
	});
});
