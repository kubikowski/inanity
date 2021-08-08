import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AnimationFrameService } from 'src/app/core/browser/animation-frame.service';
import { BackgroundCanvasService } from 'src/app/features/background/services/background-canvas.service';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundCanvasService ],
})
export class BackgroundComponent implements AfterViewInit {
	public readonly fps$: Observable<number>;

	@ViewChild('canvas', { static: true })
	private readonly canvas: ElementRef<HTMLCanvasElement>;

	constructor(
		private readonly backgroundCanvasService: BackgroundCanvasService,
		private readonly animationFrameService: AnimationFrameService,
	) {
		this.fps$ = this.animationFrameService.fps$
			.pipe(map(fps => Math.floor(fps)), distinctUntilChanged());
	}

	ngAfterViewInit(): void {
		this.backgroundCanvasService.initialize(this.canvas.nativeElement);
	}
}
