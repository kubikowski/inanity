import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SnekGame } from 'src/app/pages/not-found/snek/models/snek-game.model';
import { SnekGridNodeType } from 'src/app/pages/not-found/snek/models/snek-grid-node-type.enum';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/snek-input-listener.service';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/snek-state.service';
import { SnekStatisticsService } from 'src/app/pages/not-found/snek/services/snek-statistics.service';

@Component({
	selector: 'snek',
	templateUrl: './snek.component.html',
	styleUrls: [ './snek.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SnekDialogService,
		SnekInputListenerService,
		SnekStateService,
		SnekStatisticsService,
	],
})
export class SnekComponent {
	public readonly SnekGridNodeType = SnekGridNodeType;

	public readonly snekGame$: Observable<SnekGame>;
	public readonly highScore$: Observable<number>;
	public readonly initialSnekLength: number;

	constructor(
		private snekDialogService: SnekDialogService,
		private snekInputListenerService: SnekInputListenerService,
		private snekStateService: SnekStateService,
		private snekStatisticsService: SnekStatisticsService,
	) {
		this.snekGame$ = this.snekStateService.snekGame$;
		this.highScore$ = this.snekStateService.highScore$;
		this.initialSnekLength = this.snekStateService.initialSnekLength;
	}
}
