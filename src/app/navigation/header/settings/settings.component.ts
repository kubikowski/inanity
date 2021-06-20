import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorTheme } from '../../../shared/colors/models/color-themes/color-theme.model';
import { ColorThemes } from '../../../shared/colors/models/color-themes/color-themes.constant';
import { ColorPalette } from '../../../shared/colors/models/color-palettes/color-palette.model';
import { ColorPalettes } from '../../../shared/colors/models/color-palettes/color-palettes.constant';
import { ColorsService } from '../../../shared/colors/services/colors.service';
import { DyslexicTextService } from '../../../shared/dyslexic-text/services/dyslexic-text.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

	public readonly colorThemes = ColorThemes;
	public readonly colorPalettes = ColorPalettes;

	// Dyslexic Text
	public dyslexicTextEnabled = true;
	public dyslexiaAmount = 10;

	constructor(
		private colorsService: ColorsService,
		private dyslexicTextService: DyslexicTextService,
	) { }

	ngOnInit(): void {
		this.dyslexicTextEnabled = this.dyslexicTextService.isEnabled;
		this.dyslexiaAmount = this.dyslexicTextService.amount;
	}

	toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();
		this.colorsService.theme = theme;
	}

	togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();
		this.colorsService.palette = palette;
	}

	toggleDyslexicTextEnabled(): void {
		this.dyslexicTextService.isEnabled = this.dyslexicTextEnabled;
	}

	setDyslexiaAmount(): void {
		this.dyslexicTextService.amount = 20 - this.dyslexiaAmount;
	}
}
