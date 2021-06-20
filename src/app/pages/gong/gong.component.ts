import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/shared/svg/svg-icon.enum';

@Component({
	selector: 'gong',
	templateUrl: './gong.component.html',
	styleUrls: [ './gong.component.scss', './../page.component.scss' ],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GongComponent {

	readonly StackIcon = SvgIcon.STACK;
	readonly GongIcon = SvgIcon.GONG;

	constructor() {
	}

}
