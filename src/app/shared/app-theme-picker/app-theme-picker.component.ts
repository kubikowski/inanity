import { Component, OnInit } from '@angular/core';
import { ColorTheme } from './models/color-theme.model';
import { ColorPalette } from './models/color-palette.model';
import { ColorsService } from './services/colors.service';

@Component({
	selector: 'app-theme-picker',
	templateUrl: './app-theme-picker.component.html',
	styleUrls: ['./app-theme-picker.component.scss']
})
export class AppThemePickerComponent implements OnInit {

	// Color Themes
	colorThemes = ColorTheme.getThemes();

	// Color Palettes
	colorPalettes = ColorPalette.getPalettes();

	constructor(private colorsService: ColorsService) {
	}

	ngOnInit(): void {
	}


	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();
		this.colorsService.toggleTheme(theme);
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();
		this.colorsService.togglePalette(palette);
	}
}
