import { Component, OnInit } from '@angular/core';
import { SVGIcon } from '../../shared/svg/models/svgicon.model';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss', './../page.component.scss']
})
export class PageNotFoundComponent implements OnInit {

	wheelIcon = SVGIcon.Wheel;

	constructor() {
	}

	ngOnInit(): void {
	}

}
