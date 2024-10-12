import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';
import { ColorPalettes } from 'src/app/core/colors/models/color-palettes/color-palettes.constant';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { ColorThemes } from 'src/app/core/colors/models/color-themes/color-themes.constant';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { MovingBackgroundService } from 'src/app/features/background/services/moving-background.service';
import { DyslexicTextService } from 'src/app/features/dyslexic-text/services/dyslexic-text.service';
import { HeaderService } from 'src/app/features/navigation/services/header.service';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
	private readonly headerService = inject(HeaderService);

	public readonly settingsItems = this.headerService.settingsItems;

	public readonly colorThemes = ColorThemes;
	public readonly colorPalettes = ColorPalettes;

	public readonly minDyslexiaAmount = DyslexicTextService.minAmount;
	public readonly maxDyslexiaAmount = DyslexicTextService.maxAmount;

	public dyslexicTextEnabled = true;
	public dyslexiaAmount = 5;

	public movingBackgroundEnabled = true;
	public movingBackgroundAmount = 5;

	public constructor(
		private readonly colorsService: ColorsService,
		private readonly dyslexicTextService: DyslexicTextService,
		private readonly movingBackgroundService: MovingBackgroundService,
	) { }

	public ngOnInit(): void {
		this.dyslexicTextEnabled = this.dyslexicTextService.isEnabled;
		this.dyslexiaAmount = this.dyslexicTextService.amount;
	}

	public toggleDyslexicTextEnabled(): void {
		this.dyslexicTextService.isEnabled = this.dyslexicTextEnabled;
	}

	public setDyslexiaAmount(): void {
		this.dyslexicTextService.amount = this.dyslexiaAmount;
	}

	public toggleMovingBackgroundEnabled(): void {
		this.movingBackgroundService.isEnabled = this.movingBackgroundEnabled;
	}

	public setMovingBackgroundAmount(): void {
		this.movingBackgroundService.amount = this.movingBackgroundAmount;
	}
}
