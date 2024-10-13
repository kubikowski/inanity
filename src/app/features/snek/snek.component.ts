import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SnekGridComponent } from 'src/app/features/snek/components/snek-grid/snek-grid.component';
import { SnekOptionsComponent } from 'src/app/features/snek/components/snek-options/snek-options.component';
import { SnekAudioService } from 'src/app/features/snek/services/core/snek-audio.service';
import { SnekDialogService } from 'src/app/features/snek/services/core/snek-dialog.service';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekUserInputService } from 'src/app/features/snek/services/core/snek-user-input.service';
import { SnekSolverService } from 'src/app/features/snek/services/peripheral/snek-solver.service';
import { SnekStatisticsService } from 'src/app/features/snek/services/peripheral/snek-statistics.service';

@Component({
	selector: 'snek',
	template: `
		<snek-grid/>
		<snek-options/>
	`,
	styles: [ `:host {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}` ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SnekAudioService,
		SnekDialogService,
		SnekResolutionService,
		SnekStateService,
		SnekUserInputService,
		SnekSolverService,
		SnekStatisticsService,
	],
	standalone: true,
	imports: [ SnekGridComponent, SnekOptionsComponent ],
})
export class SnekComponent {
	private readonly snekAudioService = inject(SnekAudioService);
	private readonly snekDialogService = inject(SnekDialogService);
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly snekUserInputService = inject(SnekUserInputService);
	private readonly snekSolverService = inject(SnekSolverService);
	private readonly snekStatisticsService = inject(SnekStatisticsService);
}
