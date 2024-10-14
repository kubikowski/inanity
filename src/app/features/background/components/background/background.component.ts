import { DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, untracked, viewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AnimationFrameService } from 'src/app/core/browser/animation-frame.service';
import { BackgroundCanvasService } from 'src/app/features/background/services/background-canvas.service';
import { ClockComponent } from 'src/app/features/clock/clock.component';

@Component({
	selector: 'app-background',
	templateUrl: 'background.component.html',
	styleUrl: 'background.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundCanvasService ],
	standalone: true,
	imports: [
		DecimalPipe, MatDivider, ClockComponent,
	],
})
export class BackgroundComponent implements AfterViewInit {
	private readonly backgroundCanvasService = inject(BackgroundCanvasService);
	private readonly animationFrameService = inject(AnimationFrameService);

	private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
	public readonly fps = this.animationFrameService.fps;

	public ngAfterViewInit(): void {
		this.backgroundCanvasService.initialize(untracked(this.canvas).nativeElement);
	}
}
