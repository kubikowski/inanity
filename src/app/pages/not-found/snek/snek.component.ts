import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/snek-input-listener.service';
import { SnekService } from 'src/app/pages/not-found/snek/services/snek.service';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: [ './snek.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SnekService,
		SnekDialogService,
		SnekInputListenerService,
	],
})
export class SnekComponent {
	public readonly SnekGridNodeType = SnekGridNodeType;

	public readonly snekGame$: Observable<SnekGame>;
	public readonly highScore$: Observable<number>;
	public readonly initialSnekLength: number;

	constructor(
		private snekService: SnekService,
		private snekDialogService: SnekDialogService,
		private snekInputListenerService: SnekInputListenerService,
	) {
		this.snekGame$ = this.snekService.snekGame$;
		this.highScore$ = this.snekService.highScore$;
		this.initialSnekLength = this.snekService.initialSnekLength;
	}
}
