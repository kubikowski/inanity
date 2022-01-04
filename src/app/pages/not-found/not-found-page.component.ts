import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'not-found',
	templateUrl: './not-found-page.component.html',
	styleUrls: [ './not-found-page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
	public readonly WheelIcon = SvgIcon.WHEEL;
}
