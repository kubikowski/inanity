import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/core/snek-dialog.service';
import { SnekInputListenerService } from 'src/app/pages/not-found/snek/services/core/snek-input-listener.service';
import { SnekResolutionService } from 'src/app/pages/not-found/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { SnekSolverService } from 'src/app/pages/not-found/snek/services/peripheral/snek-solver.service';
import { SnekStatisticsService } from 'src/app/pages/not-found/snek/services/peripheral/snek-statistics.service';

@Component({
	selector: 'snek',
	template: `
		<snek-grid (swipe)="handleSwipe($event)"></snek-grid>
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
		SnekResolutionService,
		SnekStateService,
		SnekSolverService,
		SnekStatisticsService,
	],
})
export class SnekComponent {

	constructor(
		private readonly snekDialogService: SnekDialogService,
		private readonly snekInputListenerService: SnekInputListenerService,
		private readonly snekResolutionService: SnekResolutionService,
		private readonly snekStateService: SnekStateService,
		private readonly snekSolverService: SnekSolverService,
		private readonly snekStatisticsService: SnekStatisticsService,
	) { }

	public handleSwipe(swipeEvent: HammerInput): void {
		this.snekInputListenerService.handleSwipe(swipeEvent);
	}
}
