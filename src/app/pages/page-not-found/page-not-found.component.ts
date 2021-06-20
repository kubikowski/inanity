import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: [ './page-not-found.component.scss', './../page.component.scss' ],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {

	readonly WheelIcon = SvgIcon.WHEEL;

	constructor() {
	}

}
