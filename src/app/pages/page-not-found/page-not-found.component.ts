import { Component, OnInit } from '@angular/core';
import { SvgIcon } from '../../shared/svg/svg-icon.enum';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss', './../page.component.scss']
})
export class PageNotFoundComponent implements OnInit {

	readonly WheelIcon = SvgIcon.WHEEL;

	constructor() {
	}

	ngOnInit(): void {
	}

}
