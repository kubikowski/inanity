import { DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, untracked, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AnimationFrameService } from 'src/app/core/browser/services/animation-frame.service';
import { BackgroundCanvasService } from 'src/app/features/background/services/background-canvas.service';
import { BackgroundService } from 'src/app/features/background/services/background.service';
import { ClockComponent } from 'src/app/features/clock/clock.component';

@Component({
	selector: 'app-background',
	templateUrl: 'background.component.html',
	styleUrl: 'background.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundCanvasService ],
	imports: [
		DecimalPipe, MatDivider, ClockComponent,
	],
	host: {
		'[class.gradient]': 'gradient()',
	},
})
export class BackgroundComponent implements AfterViewInit {
	private readonly animationFrameService = inject(AnimationFrameService);
	private readonly backgroundService = inject(BackgroundService);
	private readonly backgroundCanvasService = inject(BackgroundCanvasService);

	public readonly gradient = this.backgroundService.gradient;
	public readonly moving = this.backgroundService.moving;
	public readonly fps = this.animationFrameService.fps;

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	public ngAfterViewInit(): void {
		this.backgroundCanvasService.initialize(untracked(this.canvas).nativeElement);
	}
}
