import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'src/app/core/decorators/observed.decorator';

@Injectable({ providedIn: 'root' })
export class ScreenDetectorService implements OnDestroy {
	private readonly renderer: Renderer2;

	private readonly resizeListenerUnsubscribeCallback: () => void;
	private readonly mouseMoveListenerUnsubscribeCallback: () => void;

	@Observed() private screenWidth: number;
	@Observed() private screenHeight: number;
	@Observed() private pixelDensity: number;
	@Observed() private mousePosition: [ number, number ] = [ 0, 0 ];

	public readonly screenWidth$: Observable<number>;
	public readonly screenHeight$: Observable<number>;
	public readonly pixelDensity$: Observable<number>;
	public readonly mousePosition$: Observable<[ number, number ]>;

	constructor(
		private readonly rendererFactory: RendererFactory2,
	) {
		this.renderer = this.rendererFactory.createRenderer(null, null);

		this.detectScreenSize();
		this.resizeListenerUnsubscribeCallback =
			this.renderer.listen('window', 'resize', this.detectScreenSize.bind(this));

		this.mouseMoveListenerUnsubscribeCallback =
			this.renderer.listen('window', 'mousemove', this.detectMouseLocation.bind(this));
	}

	ngOnDestroy(): void {
		this.resizeListenerUnsubscribeCallback();
		this.mouseMoveListenerUnsubscribeCallback();
	}

	private detectScreenSize(): void {
		const { innerWidth, innerHeight, devicePixelRatio } = window;

		this.screenWidth = innerWidth;
		this.screenHeight = innerHeight;
		this.pixelDensity = devicePixelRatio;
	}

	private detectMouseLocation(mouseMove: MouseEvent): void {
		const { clientX, clientY } = mouseMove;

		this.mousePosition = [ clientX, clientY ];
	}
}
