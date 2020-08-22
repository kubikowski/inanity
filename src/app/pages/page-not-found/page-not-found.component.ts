import { Component, OnInit } from '@angular/core';
import { WheelIcon } from '../../shared/svg/svg-icons.constant';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss', './../page.component.scss']
})
export class PageNotFoundComponent implements OnInit {

	readonly WheelIcon = WheelIcon;

	constructor() {
	}

	ngOnInit(): void {
	}

}
