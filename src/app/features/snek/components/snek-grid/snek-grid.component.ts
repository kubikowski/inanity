import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, untracked, viewChild, ViewEncapsulation } from '@angular/core';
import { JoystickOutputData } from 'nipplejs';
import { JoystickComponent } from 'src/app/features/joystick/joystick.component';
import { SnekBorderComponent } from 'src/app/features/snek/components/snek-border/snek-border.component';
import { SnekTutorialComponent } from 'src/app/features/snek/components/snek-tutorial/snek-tutorial.component';
import { SnekCanvasService } from 'src/app/features/snek/services/core/snek-canvas.service';
import { SnekResolutionService } from 'src/app/features/snek/services/core/snek-resolution.service';
import { SnekUserInputService } from 'src/app/features/snek/services/core/snek-user-input.service';

@Component({
	selector: 'snek-grid',
	templateUrl: 'snek-grid.component.html',
	styleUrl: 'snek-grid.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [ JoystickComponent, SnekBorderComponent, SnekTutorialComponent ],
	host: {
		'[style.--snek-grid-size]': 'snekGridSize() + \'px\'',
	},
})
export class SnekGridComponent implements AfterViewInit {
	private readonly snekCanvasService = inject(SnekCanvasService);
	private readonly snekResolutionService = inject(SnekResolutionService);
	private readonly snekUserInputService = inject(SnekUserInputService);

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('snekCanvas');

	public readonly snekGridSize = this.snekResolutionService.snekGridSize;
	public readonly snekWidth = this.snekResolutionService.snekWidth;
	public readonly snekHeight = this.snekResolutionService.snekHeight;

	public handleJoystick(event: JoystickOutputData): void {
		this.snekUserInputService.handleJoystick(event);
	}

	public ngAfterViewInit(): void {
		this.snekCanvasService.initialize(untracked(this.canvas).nativeElement);
	}
}
