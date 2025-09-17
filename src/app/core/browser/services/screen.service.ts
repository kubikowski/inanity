import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, DOCUMENT, effect, inject, Injectable, OnDestroy, RendererFactory2, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ScreenDisplay } from '../models/screen-display.enum';
import { ScreenOrientation } from '../models/screen-orientation.enum';

@Injectable({ providedIn: 'root' })
export class ScreenService implements OnDestroy {
	private readonly body = inject(DOCUMENT).body;
	private readonly renderer = inject(RendererFactory2).createRenderer(this.body, null);
	private readonly observer = inject(BreakpointObserver);

	public readonly isMobileView = toSignal(this.observer.observe(Breakpoints.Handset)
		.pipe(map(breakpointState => breakpointState.matches)));

	public readonly isTabletView = toSignal(this.observer.observe(Breakpoints.Tablet)
		.pipe(map(breakpointState => breakpointState.matches)));

	public readonly screenDisplay = computed(() => {
		if (this.isMobileView()) {
			return ScreenDisplay.MOBILE;
		} else if (this.isTabletView()) {
			return ScreenDisplay.TABLET;
		} else {
			return ScreenDisplay.DESKTOP;
		}
	});

	public readonly isLandscapeView = toSignal(this.observer.observe('(orientation: landscape)')
		.pipe(map(breakpointState => breakpointState.matches)));

	public readonly screenOrientation = computed(() => {
		if (this.isLandscapeView()) {
			return ScreenOrientation.LANDSCAPE;
		} else {
			return ScreenOrientation.PORTRAIT;
		}
	});

	private readonly resizeListenerUnsubscribeCallback =
		this.renderer.listen('window', 'resize', this.detectScreenSize.bind(this));

	private readonly mouseMoveListenerUnsubscribeCallback =
		this.renderer.listen('window', 'mousemove', this.detectMouseLocation.bind(this));

	public readonly screenWidth = signal<number>(0);
	public readonly screenHeight = signal<number>(0);
	public readonly pixelDensity = signal<number>(0);
	public readonly mousePosition = signal<[ number, number ]>([ 0, 0 ]);

	public constructor() {
		this.detectScreenSize();

		effect(() => this.documentBodyScreenDisplayClass = this.screenDisplay());
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

	private set documentBodyScreenDisplayClass(screenDisplay: ScreenDisplay) {
		Object.values(ScreenDisplay).forEach(display =>
			this.renderer.removeClass(this.body, display.toLowerCase()));

		this.renderer.addClass(this.body, screenDisplay.toLowerCase());
	}
}
