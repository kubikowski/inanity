import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/core/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/core/snek-input-listener.service';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { SnekSolverService } from 'src/app/pages/not-found/snek/services/peripheral/snek-solver.service';
import { SnekStatisticsService } from 'src/app/pages/not-found/snek/services/peripheral/snek-statistics.service';

@Component({
	selector: 'snek',
	template: `
		<snek-grid></snek-grid>
		<snek-options></snek-options>
	`,
	styles: [ `:host {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}` ],
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
