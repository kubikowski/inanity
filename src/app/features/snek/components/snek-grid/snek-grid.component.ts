import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { Observable } from 'rxjs';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { SnekGame } from 'src/app/features/snek/models/state/snek-game.model';
import { SnekIcon } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekUserInputService } from 'src/app/features/snek/services/core/snek-user-input.service';

@Component({
	selector: 'snek-grid',
	templateUrl: './snek-grid.component.html',
	styleUrls: [ './snek-grid.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnekGridComponent {
	public readonly snekGame$!: Observable<SnekGame>;
	public readonly snekWidth$!: Observable<number>;
	public readonly snekHeight$!: Observable<number>;

	public constructor(
		private readonly svgIconService: SvgIconService,
		private readonly snekResolutionService: SnekResolutionService,
		private readonly snekStateService: SnekStateService,
		private readonly snekUserInputService: SnekUserInputService,
	) {
		this.svgIconService.registerInternalIconPack(SnekIcon.location, SnekIcon.namespace);

		this.snekGame$ = this.snekStateService.snekGame$;
		this.snekWidth$ = this.snekResolutionService.snekWidth$;
		this.snekHeight$ = this.snekResolutionService.snekHeight$;
	}

	public handleJoystick(event: JoystickOutputData): void {
		this.snekUserInputService.handleJoystick(event);
	}
}
