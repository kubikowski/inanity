import { Component, OnInit } from '@angular/core';
import { MalbolgeExecutorService } from './services/malbolge-executor.service';
import { SvgIcon } from '../../shared/svg/svg-icon.enum';

@Component({
	selector: 'malbolge',
	templateUrl: './malbolge.component.html',
	styleUrls: [ './malbolge.component.scss', './../page.component.scss' ],
	providers: [ MalbolgeExecutorService ],
})
export class MalbolgeComponent implements OnInit {

	readonly OniIcon = SvgIcon.ONI;

	constructor(private executor: MalbolgeExecutorService) {
	}

	ngOnInit(): void {
		this.executor.loadProgram('(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:\'8dc');

		// console.log(this.executor);
	}

}
