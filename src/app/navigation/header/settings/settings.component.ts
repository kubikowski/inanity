import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { ColorPalettes } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { ColorThemes } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/services/dyslexic-text.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

	public readonly colorThemes = ColorThemes;
	public readonly colorPalettes = ColorPalettes;

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

	public toggleTheme(theme: ColorTheme, event: Event): void {
		event.stopPropagation();
		this.colorsService.theme = theme;
	}

	public togglePalette(palette: ColorPalette, event: Event): void {
		event.stopPropagation();
		this.colorsService.palette = palette;
	}

	public toggleDyslexicTextEnabled(): void {
		this.dyslexicTextService.isEnabled = this.dyslexicTextEnabled;
	}

	// Todo: this is definitely broken.
	public setDyslexiaAmount(): void {
		this.dyslexicTextService.amount = 20 - this.dyslexiaAmount;
	}
}
