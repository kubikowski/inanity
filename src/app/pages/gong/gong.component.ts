import { Component, OnInit } from '@angular/core';
import { SVGIcon } from '../../shared/svg/models/svgicon.model';

@Component({
	selector: 'gong',
	templateUrl: './gong.component.html',
	styleUrls: ['./gong.component.scss', './../page.component.scss']
})
export class GongComponent implements OnInit {

	gongIcon = SVGIcon.Gong;

	constructor() {
	}

	ngOnInit(): void {
	}

}
