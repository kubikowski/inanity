import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'snek-page',
	templateUrl: './snek-page.component.html',
	styleUrls: [ './snek-page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekPageComponent {
	public readonly SnekIcon = SvgIcon.SNAKE;
}
