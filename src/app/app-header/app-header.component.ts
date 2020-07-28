import { Component, OnInit } from '@angular/core';
import { ColorTheme } from '../shared/color-themes/models/color-theme';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

	colorThemes = ColorTheme.getThemes();

	constructor() {
	}

	ngOnInit(): void {
	}

}
