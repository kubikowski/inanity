import { Component, OnInit } from '@angular/core';
import { ColorTheme } from '../../shared/colors/models/color-theme.model';
import { ColorPalette } from '../../shared/colors/models/color-palette.model';
import { ColorsService } from '../../shared/colors/services/colors.service';
import { DyslexicTextService } from '../../shared/dyslexic-text/services/dyslexic-text.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	// Color Themes
	colorThemes = ColorTheme.Themes;

	// Color Palettes
	colorPalettes = ColorPalette.Palettes;

	// Dyslexic Text
	dyslexicTextEnabled = true;
	dyslexiaAmount = 10;

	constructor(private colorsService: ColorsService,
				private dyslexicTextService: DyslexicTextService) {
	}

	ngOnInit(): void {
		this.dyslexicTextEnabled = this.dyslexicTextService.getEnabled();
		this.dyslexiaAmount = this.dyslexicTextService.getAmount();
	}

	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();
		this.colorsService.toggleTheme(theme);
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();
		this.colorsService.togglePalette(palette);
	}

	toggleDyslexicTextEnabled(): void {
		this.dyslexicTextService.setEnabled(this.dyslexicTextEnabled);
	}

	setDyslexiaAmount(): void {
		this.dyslexicTextService.setAmount(20 - this.dyslexiaAmount);
	}
}
