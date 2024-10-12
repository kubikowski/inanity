import { fakeAsync, TestBed } from '@angular/core/testing';
import { BaseColorPalette } from 'src/app/core/colors/models/color-palettes/base-color-palette.model';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { BluePalette, GreenPalette } from 'src/app/core/colors/models/color-palettes/color-palettes.constant';
import { BaseColorTheme } from 'src/app/core/colors/models/color-themes/base-color-theme.model';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { DarkTheme, LightTheme } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { ColorsService } from 'src/app/core/colors/services/colors.service';

describe('ColorsService', () => {
	let colorsService: ColorsService;

	const body = document.body;
	const style = document.documentElement.style;

	let theme: ColorTheme;
	let palette: ColorPalette;

	function setDarkTheme(): void {
		colorsService.theme.set(DarkTheme);

		theme = DarkTheme;
		palette = palette.inverse(DarkTheme);

		TestBed.flushEffects();
	}

	function setGreenPalette(): void {
		colorsService.palette.set(GreenPalette);

		palette = (theme === LightTheme)
			? GreenPalette
			: GreenPalette.inverse(theme);

		TestBed.flushEffects();
	}

	beforeEach(() => {
		colorsService = TestBed.inject(ColorsService);

		colorsService.theme.set(LightTheme);
		colorsService.palette.set(BluePalette);

		theme = LightTheme;
		palette = BluePalette;
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
			(Object.entries(BaseColorTheme.CssVariables) as [ keyof BaseColorTheme, string ][])
				.forEach(([ key, cssVariable ]) =>
					expect(style.getPropertyValue(cssVariable)).toBe(theme[key]));
		});

		it('should have set palette css values on element', () => {
			(Object.entries(BaseColorPalette.CssVariables) as [ keyof BaseColorPalette, string ][])
				.forEach(([ key, cssVariable ]) =>
					expect(style.getPropertyValue(cssVariable)).toBe(palette[key]));
		});

		it('should update theme css values on toggleTheme', fakeAsync(() => {
			setDarkTheme();
			(Object.entries(BaseColorTheme.CssVariables) as [ keyof BaseColorTheme, string ][])
				.forEach(([ key, cssVariable ]) =>
					expect(style.getPropertyValue(cssVariable)).toBe(theme[key]));
		}));

		it('should update palette css values on togglePalette', fakeAsync(() => {
			setGreenPalette();
			(Object.entries(BaseColorPalette.CssVariables) as [ keyof BaseColorPalette, string ][])
				.forEach(([ key, cssVariable ]) =>
					expect(style.getPropertyValue(cssVariable)).toBe(palette[key]));
		}));

		it('should update inverse palette css values on toggleTheme', fakeAsync(() => {
			setDarkTheme();
			(Object.entries(BaseColorPalette.CssVariables) as [ keyof BaseColorPalette, string ][])
				.forEach(([ key, cssVariable ]) =>
					expect(style.getPropertyValue(cssVariable)).toBe(palette[key]));
		}));
	});
});
