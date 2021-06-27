import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/snek-input-listener.service';
import { SnekSolverService } from 'src/app/pages/not-found/snek/services/snek-solver.service';
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
		SnekSolverService,
		SnekStateService,
		SnekStatisticsService,
	],
})
export class SnekComponent {

	constructor(
		private readonly snekDialogService: SnekDialogService,
		private readonly snekInputListenerService: SnekInputListenerService,
		private readonly snekSolverService: SnekSolverService,
		private readonly snekStateService: SnekStateService,
		private readonly snekStatisticsService: SnekStatisticsService,
	) { }

}
