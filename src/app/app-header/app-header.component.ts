import { Component, OnInit } from '@angular/core';
import { ColorPalette } from '../shared/colors/models/color-palette.model';
import { ColorTheme } from '../shared/colors/models/color-theme.model';
import { ColorsService } from '../shared/colors/services/colors.service';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

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
