import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MalbolgeExecutorService } from 'src/app/features/malbolge/services/malbolge-executor.service';

@Component({
	selector: 'malbolge-page',
	templateUrl: './malbolge-page.component.html',
	styleUrls: [ './malbolge-page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ MalbolgeExecutorService ],
})
export class MalbolgePageComponent {

	public constructor(
		private readonly executor: MalbolgeExecutorService,
	) {
		this.executor.loadProgram('(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:\'8dc');
	}
}
