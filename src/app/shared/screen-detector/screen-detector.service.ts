import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Observed } from 'src/app/shared/decorators/observed.decorator';

@Injectable({ providedIn: 'root' })
export class ScreenDetectorService implements OnDestroy {
	private readonly renderer: Renderer2;
	private readonly listenerUnsubscribeCallback: () => void;

	@Observed() public screenWidth: number;
	@Observed() public screenHeight: number;

	public readonly screenWidth$: Observable<number>;
	public readonly screenHeight$: Observable<number>;

	constructor(
		private readonly rendererFactory: RendererFactory2,
	) {
		this.renderer = this.rendererFactory.createRenderer(null, null);

		this.detectScreenSize();
		this.listenerUnsubscribeCallback =
			this.renderer.listen('window', 'resize', this.detectScreenSize.bind(this));
	}

	ngOnDestroy(): void {
		this.listenerUnsubscribeCallback();
	}

	private detectScreenSize(): void {
		const { innerWidth, innerHeight } = window;

		this.screenWidth = innerWidth;
		this.screenHeight = innerHeight;
	}
}
