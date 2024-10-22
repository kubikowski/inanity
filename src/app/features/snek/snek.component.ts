import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { SnekGridComponent } from 'src/app/features/snek/components/snek-grid/snek-grid.component';
import { SnekOptionsComponent } from 'src/app/features/snek/components/snek-options/snek-options.component';
import { SnekIconUtil } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekAudioService } from 'src/app/features/snek/services/core/snek-audio.service';
import { SnekCanvasService } from 'src/app/features/snek/services/core/snek-canvas.service';
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
		SnekCanvasService,
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
	public constructor() {
		inject(SvgIconService).registerInternalIconPack(SnekIconUtil.location, SnekIconUtil.namespace);

		inject(SnekAudioService);
		inject(SnekCanvasService);
		inject(SnekDialogService);
		inject(SnekResolutionService);
		inject(SnekStateService);
		inject(SnekUserInputService);
		inject(SnekSolverService);
		inject(SnekStatisticsService);
	}
}
