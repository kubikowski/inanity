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
		this.executor.loadProgram('(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:\'8dc');

		console.log(this.executor);
	}

}
