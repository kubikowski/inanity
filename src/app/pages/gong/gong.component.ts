import { Component, OnInit } from '@angular/core';
import { GongIcon } from '../../shared/svg/svg-icons.constant';

@Component({
	selector: 'gong',
	templateUrl: './gong.component.html',
	styleUrls: ['./gong.component.scss', './../page.component.scss']
})
export class GongComponent implements OnInit {

	readonly GongIcon = GongIcon;

	constructor() {
	}

	ngOnInit(): void {
	}

}
