import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { BaseDialogComponent } from 'src/app/features/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/features/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/features/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/features/dialogs/models/configuration/dialog-configuration.model';
import { ColorPalettes } from '../../models/color-palettes/color-palettes.constant';
import { ColorThemes } from '../../models/color-themes/color-themes.constant';
import { ColorsService } from '../../services/colors.service';
import { PalettePickerComponent } from '../palette-picker/palette-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
	selector: 'color-theme-dialog',
	templateUrl: 'color-theme-dialog.component.html',
	styleUrl: 'color-theme-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatDivider, BaseDialogComponent,
		ThemePickerComponent, PalettePickerComponent,
	],
})
export class ColorThemeDialogComponent extends DialogComponent {
	private readonly colorsService = inject(ColorsService);

	public readonly selectedTheme = this.colorsService.theme;
	public readonly selectedPalette = this.colorsService.palette;

	public readonly ColorThemes = ColorThemes;
	public readonly ColorPalettes = ColorPalettes;

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Color Theme')
			.withSubmitButtonHidden()
			.withCancelButtonHidden()
			.build();
	}
}
