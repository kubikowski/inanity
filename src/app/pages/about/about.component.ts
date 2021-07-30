import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'about-page',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

	constructor() {
	}

}
