import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { SnekDialogService } from 'src/app/pages/not-found/snek/services/core/snek-dialog.service';
import { SnekResolutionService } from 'src/app/pages/not-found/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/pages/not-found/snek/services/core/snek-state.service';
import { SnekUserInputService } from 'src/app/pages/not-found/snek/services/core/snek-user-input.service';
import { SnekSolverService } from 'src/app/pages/not-found/snek/services/peripheral/snek-solver.service';
import { SnekStatisticsService } from 'src/app/pages/not-found/snek/services/peripheral/snek-statistics.service';

@Component({
	selector: 'snek',
	template: `
		<joystick (move)="handleJoystick($event)"></joystick>
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
		SnekResolutionService,
		SnekStateService,
		SnekUserInputService,
		SnekSolverService,
		SnekStatisticsService,
	],
})
export class SnekComponent {

	constructor(
		private readonly snekDialogService: SnekDialogService,
		private readonly snekResolutionService: SnekResolutionService,
		private readonly snekStateService: SnekStateService,
		private readonly snekUserInputService: SnekUserInputService,
		private readonly snekSolverService: SnekSolverService,
		private readonly snekStatisticsService: SnekStatisticsService,
	) { }

	public handleJoystick(event: JoystickOutputData): void {
		this.snekUserInputService.handleJoystick(event);
	}
}
