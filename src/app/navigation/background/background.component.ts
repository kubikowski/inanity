import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
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
export class BackgroundComponent implements AfterViewInit {
	public readonly fps$: Observable<number>;

	@ViewChild('canvas', { static: true })
	private readonly canvas: ElementRef<HTMLCanvasElement>;

	constructor(
		private readonly backgroundCanvasService: BackgroundCanvasService,
		private readonly fpsService: FpsService,
	) {
		this.fps$ = this.fpsService.fps$
			.pipe(map(fps => Math.floor(fps)), distinctUntilChanged());
	}

	ngAfterViewInit(): void {
		this.backgroundCanvasService.initialize(this.canvas.nativeElement);
	}
}
