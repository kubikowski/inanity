import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ColorPaletteUtil } from 'src/app/core/colors/models/color-palettes/color-palette-util.model';
import { ColorThemeUtil } from 'src/app/core/colors/models/color-themes/color-theme-util.model';
import { BaseDialogComponent } from 'src/app/core/dialogs/components/base-dialog/base-dialog.component';
import { DialogComponent } from 'src/app/core/dialogs/components/dialog.component';
import { DialogBuilder } from 'src/app/core/dialogs/models/builder/dialog.builder';
import { DialogConfiguration } from 'src/app/core/dialogs/models/configuration/dialog-configuration.model';
import { ColorsService } from '../../services/colors.service';
import { PalettePickerComponent } from '../palette-picker/palette-picker.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
	selector: 'color-theme-dialog',
	templateUrl: 'color-theme-dialog.component.html',
	styleUrl: 'color-theme-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatDivider, BaseDialogComponent,
		ThemePickerComponent, PalettePickerComponent,
	],
})
export class ColorThemeDialogComponent extends DialogComponent {
	private readonly colorsService = inject(ColorsService);

	public readonly selectedTheme = this.colorsService.theme;
	public readonly selectedPalette = this.colorsService.palette;

	public readonly ColorThemes = ColorThemeUtil.all;
	public readonly ColorPalettes = ColorPaletteUtil.all;

	public initializeDialogConfiguration(): DialogConfiguration {
		return DialogBuilder.new()
			.withHeaderTitle('Color Theme')
			.withSubmitHidden()
			.withCancelHidden()
			.build();
	}
}
