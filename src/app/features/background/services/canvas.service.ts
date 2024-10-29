import { computed, effect, inject, Injectable, OnDestroy, Signal, signal } from '@angular/core';
import { ScreenService } from 'src/app/core/browser/services/screen.service';
import { ColorsService } from 'src/app/core/colors/services/colors.service';
import { SubSink } from 'subsink';

@Injectable()
export abstract class CanvasService implements OnDestroy {
	protected readonly screenService = inject(ScreenService);
	protected readonly colorsService = inject(ColorsService);
	protected readonly subscriptions = new SubSink();

	protected readonly canvas = signal<HTMLCanvasElement | null>(null);
	protected readonly context = computed(() => this.canvas()?.getContext('2d') ?? null);

	protected abstract readonly rawCanvasWidth: Signal<number>;
	protected abstract readonly rawCanvasHeight: Signal<number>;

	protected readonly pixelDensity = this.screenService.pixelDensity.asReadonly();
	protected readonly canvasWidth = computed(() => Math.floor(this.rawCanvasWidth() * this.pixelDensity()));
	protected readonly canvasHeight = computed(() => Math.floor(this.rawCanvasHeight() * this.pixelDensity()));


	protected constructor() {
		effect(() => this.setCanvasResolution());
		effect(() => this.setContextScale());
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	public initialize(canvas: HTMLCanvasElement): void {
		this.canvas.set(canvas);
	}

	private setCanvasResolution(): void {
		const canvas = this.canvas();

		if (canvas !== null) {
			canvas.style.height = `${ this.rawCanvasHeight() }px`;
			canvas.style.width = `${ this.rawCanvasWidth() }px`;
			canvas.width = this.canvasWidth();
			canvas.height = this.canvasHeight();
		}
	}

	private setContextScale(): void {
		const context = this.context();

		if (context !== null) {
			context.scale(this.pixelDensity(), this.pixelDensity());
		}
	}
}
