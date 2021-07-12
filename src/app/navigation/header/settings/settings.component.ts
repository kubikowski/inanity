import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorPalette } from 'src/app/shared/colors/models/color-palettes/color-palette.model';
import { ColorPalettes } from 'src/app/shared/colors/models/color-palettes/color-palettes.constant';
import { ColorTheme } from 'src/app/shared/colors/models/color-themes/color-theme.model';
import { ColorThemes } from 'src/app/shared/colors/models/color-themes/color-themes.constant';
import { ColorsService } from 'src/app/shared/colors/services/colors.service';
import { DyslexicTextService } from 'src/app/shared/dyslexic-text/dyslexic-text.service';
import { MovingBackgroundService } from 'src/app/shared/moving-background/moving-background.service';

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
	public dyslexiaAmount = 5;

	public movingBackgroundEnabled = true;
	public movingBackgroundAmount = 5;

	constructor(
		private readonly colorsService: ColorsService,
		private readonly dyslexicTextService: DyslexicTextService,
		private readonly movingBackgroundService: MovingBackgroundService,
	) { }

	ngOnInit(): void {
		this.dyslexicTextEnabled = this.dyslexicTextService.isEnabled;
		this.dyslexiaAmount = 20 - this.dyslexicTextService.amount;
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

	public setDyslexiaAmount(): void {
		this.dyslexicTextService.amount = 20 - this.dyslexiaAmount;
	}

	public toggleMovingBackgroundEnabled(): void {
		this.movingBackgroundService.isEnabled = this.movingBackgroundEnabled;
	}

	public setMovingBackgroundAmount(): void {
		this.movingBackgroundService.amount = this.movingBackgroundAmount;
	}
}
