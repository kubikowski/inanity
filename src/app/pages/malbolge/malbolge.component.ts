import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIcon } from 'src/app/core/svg/svg-icon.enum';
import { MalbolgeExecutorService } from 'src/app/pages/malbolge/services/malbolge-executor.service';

@Component({
	selector: 'malbolge',
	templateUrl: './malbolge.component.html',
	styleUrls: [ './malbolge.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ MalbolgeExecutorService ],
})
export class MalbolgeComponent {
	public readonly OniIcon = SvgIcon.ONI;

	constructor(
		private executor: MalbolgeExecutorService,
	) {
		this.executor.loadProgram('(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:\'8dc');

		// console.log(this.executor);
	}

}
