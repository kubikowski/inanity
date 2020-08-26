import { Component, OnInit } from '@angular/core';
import { MalbolgeExecutorService } from './services/malbolge-executor.service';

@Component({
	selector: 'app-malbolge',
	templateUrl: './malbolge.component.html',
	styleUrls: [ './malbolge.component.scss' ],
	providers: [ MalbolgeExecutorService ],
})
export class MalbolgeComponent implements OnInit {

	constructor(private executor: MalbolgeExecutorService) {
	}

	ngOnInit(): void {
		this.executor.loadProgram('(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:\'8dc');

		console.log(this.executor);
	}

}
