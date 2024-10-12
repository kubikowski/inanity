import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ColorPalette } from 'src/app/core/colors/models/color-palettes/color-palette.model';

@Component({
	selector: 'palette-picker',
	templateUrl: './palette-picker.component.html',
	styleUrls: [ './palette-picker.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatIcon ],
})
export class PalettePickerComponent {
	public readonly palette = input.required<ColorPalette>();
}
