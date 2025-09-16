import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ColorTheme } from 'src/app/core/colors/models/color-themes/color-theme.model';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'theme-picker',
	templateUrl: 'theme-picker.component.html',
	styleUrl: 'theme-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ MatIcon ],
	host: {
		'[style.--color-background-default]': 'this.theme().colorDefaultBackground',
		'[style.--color-text-default]': 'this.theme().colorDefaultText',
		'[style.--color-text-disabled]': 'this.theme().colorDisabledText',
		'[style.--color-text-light]': 'this.theme().colorLightText',
	},
})
export class ThemePickerComponent {
	public readonly ICON = SvgIcon.STACK;

	public readonly theme = input.required<ColorTheme>();

	public readonly message = computed(() => {
		switch (this.theme().prefers) {
			case 'light':
				return 'Have a nice day!';
			case 'dark':
				return 'Have a nice night!';
			default:
				return this.theme().themeName;
		}
	});
}
