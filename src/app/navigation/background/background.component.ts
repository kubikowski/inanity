import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BackgroundCanvasService } from 'src/app/navigation/background/services/background-canvas.service';
import { FpsService } from 'src/app/shared/screen-detector/fps.service';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: [ './background.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ BackgroundCanvasService ],
})
export class BackgroundComponent {
	public readonly fps$: Observable<number>;

	constructor(
		private readonly backgroundCanvasService: BackgroundCanvasService,
		private readonly fpsService: FpsService,
	) {
		this.fps$ = this.fpsService.fps$
			.pipe(map(fps => Math.floor(fps)), distinctUntilChanged());
	}

	@ViewChild('canvas', { static: true })
	private set canvas(canvasRef: ElementRef<HTMLCanvasElement>) {
		this.backgroundCanvasService.initialize(canvasRef.nativeElement);
	}
}
