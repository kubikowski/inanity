import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ColorTheme } from '../../../shared/colors/models/color-themes/color-theme.model';
import { ColorThemes } from '../../../shared/colors/models/color-themes/color-themes.constant';
import { ColorPalette } from '../../../shared/colors/models/color-palettes/color-palette.model';
import { ColorPalettes } from '../../../shared/colors/models/color-palettes/color-palettes.constant';
import { ColorsService } from '../../../shared/colors/services/colors.service';
import { DyslexicTextService } from '../../../shared/dyslexic-text/services/dyslexic-text.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

	// Color Themes
	readonly colorThemes = ColorThemes;

	// Color Palettes
	readonly colorPalettes = ColorPalettes;

	// Dyslexic Text
	dyslexicTextEnabled = true;
	dyslexiaAmount = 10;

	constructor(
		private colorsService: ColorsService,
		private dyslexicTextService: DyslexicTextService,
	) { }

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
