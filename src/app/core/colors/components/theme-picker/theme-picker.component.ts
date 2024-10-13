import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'theme-picker',
	templateUrl: 'theme-picker.component.html',
	styleUrl: 'theme-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatIcon ],
	host: {
		'[style.background-color]': 'backgroundColor()',
		'[style.color]': 'color()',
	},
})
export class ThemePickerComponent {
	public readonly ICON = SvgIcon.STACK;

	public readonly theme = input.required<ColorTheme>();

	public readonly backgroundColor = computed(() => this.theme().colorDefaultBackground);
	public readonly color = computed(() => this.theme().colorDefaultText);
	public readonly message = computed(() => {
		switch (this.theme().themeName) {
			case 'light-theme':
				return 'Have a nice day!';
			case 'dark-theme':
				return 'Have a nice night!';
			default:
				return this.theme().themeName;
		}
	});
}
