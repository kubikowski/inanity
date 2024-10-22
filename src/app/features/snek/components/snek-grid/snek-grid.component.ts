import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, untracked, viewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { JoystickOutputData } from 'nipplejs';
import { JoystickComponent } from 'src/app/features/joystick/joystick.component';
import { SnekCanvasService } from 'src/app/features/snek/services/core/snek-canvas.service';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekStateService } from 'src/app/features/snek/services/core/snek-state.service';
import { SnekUserInputService } from 'src/app/features/snek/services/core/snek-user-input.service';

@Component({
	selector: 'snek-grid',
	templateUrl: 'snek-grid.component.html',
	styleUrl: 'snek-grid.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ MatTooltip, JoystickComponent ],
})
export class SnekGridComponent implements AfterViewInit {
	private readonly snekCanvasService = inject(SnekCanvasService);
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekStateService = inject(SnekStateService);
	private readonly snekUserInputService = inject(SnekUserInputService);

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('snekCanvas');

	public readonly snekGame = this.snekStateService.snekGame;
	public readonly snekSeed = computed(() => `#${ this.snekGame().seed.toString(16).padStart(4, '0') }`);
	public readonly snekWidth = this.snekResolutionService.snekWidth;
	public readonly snekHeight = this.snekResolutionService.snekHeight;

	public handleJoystick(event: JoystickOutputData): void {
		this.snekUserInputService.handleJoystick(event);
	}

	public ngAfterViewInit(): void {
		this.snekCanvasService.initialize(untracked(this.canvas).nativeElement);
	}
}
