import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'malbolge-specification',
	templateUrl: './malbolge-specification.component.html',
	styleUrls: [ './malbolge-specification.component.scss', './../../page.component.scss'  ]
})
export class MalbolgeSpecificationComponent implements OnInit {

	step = 1;

	constructor() {
	}

	ngOnInit(): void {
	}

	setStep(index: number): void {
		this.step = index;
	}
}
