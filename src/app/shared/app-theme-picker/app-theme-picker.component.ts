import { Component, OnInit } from '@angular/core';
import { ColorTheme } from './models/color-theme.model';
import { ColorPalette } from './models/color-palette.model';
import { ColorsService } from './services/colors.service';
import { DyslexicTextService } from '../dyslexic-text/services/dyslexic-text.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

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

	// Dyslexic Text Enabled
	dyslexicText = true;

	constructor(private colorsService: ColorsService,
				private dyslexicTextService: DyslexicTextService) {
	}

	ngOnInit(): void {
		this.dyslexicText = this.dyslexicTextService.getEnabled();
	}


	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();
		this.colorsService.toggleTheme(theme);
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();
		this.colorsService.togglePalette(palette);
	}

	toggleDyslexicText(event: Event | MatCheckboxChange): void {
		if (event instanceof Event) {
			event.stopPropagation();
		}

		this.dyslexicTextService.setEnabled(this.dyslexicText);
	}
}
