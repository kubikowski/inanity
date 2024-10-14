import { inject, Injectable, OnDestroy, RendererFactory2, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScreenDetectorService implements OnDestroy {
	private readonly renderer = inject(RendererFactory2).createRenderer(null, null);

	private readonly resizeListenerUnsubscribeCallback: () => void;
	private readonly mouseMoveListenerUnsubscribeCallback: () => void;

	public readonly screenWidth = signal<number>(0);
	public readonly screenHeight = signal<number>(0);
	public readonly pixelDensity = signal<number>(0);
	public readonly mousePosition = signal<[ number, number ]>([ 0, 0 ]);

	public constructor() {
		this.detectScreenSize();
		this.resizeListenerUnsubscribeCallback =
			this.renderer.listen('window', 'resize', this.detectScreenSize.bind(this));

		this.mouseMoveListenerUnsubscribeCallback =
			this.renderer.listen('window', 'mousemove', this.detectMouseLocation.bind(this));
	}

	public ngOnDestroy(): void {
		this.resizeListenerUnsubscribeCallback();
		this.mouseMoveListenerUnsubscribeCallback();
	}

	private detectScreenSize(): void {
		const { innerWidth, innerHeight, devicePixelRatio } = window;

		this.screenWidth.set(innerWidth);
		this.screenHeight.set(innerHeight);
		this.pixelDensity.set(devicePixelRatio);
	}

	private detectMouseLocation(mouseMove: MouseEvent): void {
		const { clientX, clientY } = mouseMove;

		this.mousePosition.set([ clientX, clientY ]);
	}
}
