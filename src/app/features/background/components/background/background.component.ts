import { AsyncPipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Observable } from 'rxjs';
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
		AsyncPipe, DecimalPipe, MatDivider, ClockComponent,
	],
})
export class BackgroundComponent implements AfterViewInit {
	public readonly fps$: Observable<number>;

	@ViewChild('canvas', { static: true })
	private readonly canvas!: ElementRef<HTMLCanvasElement>;

	public constructor(
		private readonly backgroundCanvasService: BackgroundCanvasService,
		private readonly animationFrameService: AnimationFrameService,
	) {
		this.fps$ = this.animationFrameService.fps$;
	}

	public ngAfterViewInit(): void {
		if (typeof this.canvas === 'undefined') {
			throw new Error('missing element: canvas');
		}

		this.backgroundCanvasService.initialize(this.canvas.nativeElement);
	}
}
