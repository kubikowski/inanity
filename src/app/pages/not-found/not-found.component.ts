import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';

@Component({
	selector: 'not-found',
	templateUrl: './not-found.component.html',
	styleUrls: [ './not-found.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

	readonly WheelIcon = SvgIcon.WHEEL;

	constructor() {
	}

}
