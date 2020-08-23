import { Component, OnInit } from '@angular/core';
import { MalbolgeExecutor } from './models/malbolge-executor';

@Component({
	selector: 'app-malbolge',
	templateUrl: './malbolge.component.html',
	styleUrls: [ './malbolge.component.scss' ]
})
export class MalbolgeComponent implements OnInit {

	private executor = new MalbolgeExecutor();

	constructor() {
	}

	ngOnInit(): void {
		this.executor.loadProgram('');

		console.log(this.executor);
	}

}
