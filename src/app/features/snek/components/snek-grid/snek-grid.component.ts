import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { SvgIconService } from 'src/app/core/svg/svg-icon.service';
import { JoystickComponent } from 'src/app/features/joystick/joystick.component';
import { SnekGridNodeComponent } from 'src/app/features/snek/components/snek-grid-node/snek-grid-node.component';
import { SnekIconUtil } from 'src/app/features/snek/models/svg/snek-icon.enum';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekUserInputService } from 'src/app/features/snek/services/core/snek-user-input.service';

@Component({
	selector: 'snek-grid',
	templateUrl: 'snek-grid.component.html',
	styleUrl: 'snek-grid.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		AsyncPipe, JoystickComponent, SnekGridNodeComponent,
	],
})
export class SnekGridComponent {
	private readonly svgIconService = inject(SvgIconService);
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly snekUserInputService = inject(SnekUserInputService);

	public readonly snekGame$ = this.snekStateService.snekGame$;
	public readonly snekWidth = this.snekResolutionService.snekWidth;
	public readonly snekHeight = this.snekResolutionService.snekHeight;

	public constructor() {
		this.svgIconService.registerInternalIconPack(SnekIconUtil.location, SnekIconUtil.namespace);
	}

	public handleJoystick(event: JoystickOutputData): void {
		this.snekUserInputService.handleJoystick(event);
	}
}
