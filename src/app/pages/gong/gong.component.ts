import { Component, OnInit } from '@angular/core';
import { SvgIcon } from '../../shared/svg/svg-icon.enum';

@Component({
	selector: 'gong',
	templateUrl: './gong.component.html',
	styleUrls: ['./gong.component.scss', './../page.component.scss']
})
export class GongComponent implements OnInit {

	readonly StackIcon = SvgIcon.STACK;
	readonly GongIcon = SvgIcon.GONG;

	constructor() {
	}

	ngOnInit(): void {
	}

}
